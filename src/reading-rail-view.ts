import {
  gaussianWaveOffset,
  isSpringSettled,
  isWithinWaveRadius,
  stepSpring,
} from "./motion";
import {
  IMAGE_ORB_ASSETS,
  INLINE_ORB_SVGS,
  STATIC_ORB_STYLES,
  resolveOrbStyle,
  type OrbStyleSetting,
  type ResolvedOrbStyle,
} from "./orb-styles";
import { resolveVariableLabelPositions } from "./outline-model";
import { clamp01, progressFromPointer } from "./progress";
import type { OutlineEntry } from "./types";

const PROXIMITY_DISTANCE = 96;
const COLLAPSE_DELAY = 3000;
const LABEL_GAP = 4;
const ORB_ROTATION_PER_PX = 3.2;

interface MutationObserverHandle {
  observe(target: Node, options?: MutationObserverInit): void;
  disconnect(): void;
}

export interface RailViewCallbacks {
  onHeadingSelect(entry: OutlineEntry): void;
  onProgressSelect(progress: number): void;
}

export interface RailAppearanceProvider {
  getOrbStyle(): OrbStyleSetting;
  getAssetUrl(path: string): string;
}

export interface RailViewEnvironment {
  requestAnimationFrame(callback: FrameRequestCallback): number;
  cancelAnimationFrame(id: number): void;
  reducedMotion(): boolean;
  createMutationObserver(callback: MutationCallback): MutationObserverHandle;
}

export interface ReadingRailViewOptions {
  appearance?: RailAppearanceProvider;
  environment?: RailViewEnvironment;
}

const DEFAULT_APPEARANCE: RailAppearanceProvider = {
  getOrbStyle: () => "default",
  getAssetUrl: (path) => path,
};

export class ReadingRailView {
  private readonly host: HTMLElement;
  private readonly window: Window;
  private readonly root: HTMLElement;
  private readonly track: HTMLElement;
  private readonly ticksContainer: HTMLElement;
  private readonly headingTicksContainer: HTMLElement;
  private readonly active: HTMLElement;
  private readonly orb: HTMLElement;
  private readonly progressLabel: HTMLElement;
  private readonly labelsContainer: HTMLElement;
  private readonly callbacks: RailViewCallbacks;
  private readonly appearance: RailAppearanceProvider;
  private readonly environment: RailViewEnvironment;
  private ticks: HTMLElement[] = [];
  private tickYPositions: number[] = [];
  private headingTicks: HTMLElement[] = [];
  private headingTickYPositions: number[] = [];
  private labels: HTMLButtonElement[] = [];
  private entries: OutlineEntry[] = [];
  private currentProgress = 0;
  private trackHeight = 1;
  private targetPosition = 0;
  private displayedPosition = 0;
  private velocity = 0;
  private positionInitialized = false;
  private visible = true;
  private frameId: number | null = null;
  private lastFrameTimestamp: number | null = null;
  private collapseTimer: number | null = null;
  private followObserver: MutationObserverHandle | null = null;
  private orbImage: HTMLImageElement | null = null;
  private orbMedia: HTMLElement | null = null;
  private resolvedOrbStyle: ResolvedOrbStyle = "default";
  private needsLabelLayout = false;
  private destroyed = false;

  private constructor(
    host: HTMLElement,
    callbacks: RailViewCallbacks,
    options: ReadingRailViewOptions,
  ) {
    const document = host.ownerDocument;
    const window = document.defaultView;
    if (!window) {
      throw new Error("Crisp Reading Rail requires a window-backed document.");
    }
    this.host = host;
    this.window = window;
    this.callbacks = callbacks;
    this.appearance = options.appearance ?? DEFAULT_APPEARANCE;
    this.environment = options.environment ?? {
      requestAnimationFrame: (callback) => window.requestAnimationFrame(callback),
      cancelAnimationFrame: (id) => window.cancelAnimationFrame(id),
      reducedMotion: () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ?? false,
      createMutationObserver: (callback) => new window.MutationObserver(callback),
    };

    this.root = document.createElement("nav");
    this.root.className = "crisp-reading-rail";
    this.root.setAttribute("aria-label", "Article navigation");

    this.track = document.createElement("div");
    this.track.className = "crisp-reading-rail__track";
    this.track.setAttribute("role", "slider");
    this.track.setAttribute("tabindex", "0");
    this.track.setAttribute("aria-label", "Reading position");
    this.track.setAttribute("aria-valuemin", "0");
    this.track.setAttribute("aria-valuemax", "100");
    this.track.setAttribute("aria-valuenow", "0");

    this.ticksContainer = document.createElement("div");
    this.ticksContainer.className = "crisp-reading-rail__ticks";
    this.ticksContainer.setAttribute("aria-hidden", "true");

    this.headingTicksContainer = document.createElement("div");
    this.headingTicksContainer.className = "crisp-reading-rail__heading-ticks";
    this.headingTicksContainer.setAttribute("aria-hidden", "true");

    this.active = document.createElement("div");
    this.active.className = "crisp-reading-rail__active";
    this.active.setAttribute("aria-hidden", "true");

    this.orb = document.createElement("div");
    this.orb.className = "crisp-reading-rail__orb";
    this.orb.setAttribute("aria-hidden", "true");

    this.progressLabel = document.createElement("span");
    this.progressLabel.className = "crisp-reading-rail__progress";
    this.progressLabel.setAttribute("aria-hidden", "true");
    this.progressLabel.textContent = "0.00";

    this.labelsContainer = document.createElement("div");
    this.labelsContainer.className = "crisp-reading-rail__labels";

    this.track.append(
      this.ticksContainer,
      this.headingTicksContainer,
      this.active,
      this.orb,
      this.progressLabel,
    );
    this.root.append(this.track, this.labelsContainer);
    host.append(this.root);

    this.track.addEventListener("pointerdown", this.handlePointerDown);
    this.track.addEventListener("keydown", this.handleKeyDown);
    this.host.addEventListener("pointermove", this.handlePointerMove, { passive: true });
    this.host.addEventListener("pointerleave", this.handlePointerLeave);
    this.root.addEventListener("focusin", this.handleFocusIn);
    this.root.addEventListener("focusout", this.handleFocusOut);
    this.refreshAppearance();
  }

  static mount(
    host: HTMLElement,
    callbacks: RailViewCallbacks,
    options: ReadingRailViewOptions = {},
  ): ReadingRailView {
    return new ReadingRailView(host, callbacks, options);
  }

  setOutline(entries: readonly OutlineEntry[], tickCount: number): void {
    const document = this.root.ownerDocument;
    const count = Math.max(0, Math.floor(tickCount));
    this.entries = entries.map((entry) => ({ ...entry }));
    this.ticks = Array.from({ length: count }, (_, index) => {
      const tick = document.createElement("span");
      tick.className = "crisp-reading-rail__tick";
      tick.setAttribute("aria-hidden", "true");
      const progress = count <= 1 ? 0 : index / (count - 1);
      tick.dataset.progress = progress.toString();
      return tick;
    });
    this.ticksContainer.replaceChildren(...this.ticks);

    this.headingTicks = this.entries.map((entry) => {
      const tick = document.createElement("span");
      tick.className = "crisp-reading-rail__heading-tick";
      tick.dataset.level = String(entry.level);
      tick.style.setProperty(
        "--crisp-reading-heading-progress",
        clamp01(entry.progress).toString(),
      );
      tick.setAttribute("aria-hidden", "true");
      return tick;
    });
    this.headingTicksContainer.replaceChildren(...this.headingTicks);

    this.labels = this.entries.map((entry) => {
      const label = document.createElement("button");
      label.type = "button";
      label.className = "crisp-reading-rail__label";
      label.textContent = entry.text;
      label.style.setProperty("--crisp-reading-level", String(entry.level - 2));
      label.addEventListener("click", () => this.callbacks.onHeadingSelect(entry));
      return label;
    });
    this.labelsContainer.replaceChildren(...this.labels);
    this.measureLayout();
    this.updateReadTicks();
    this.renderPosition();
  }

  setProgress(progress: number): void {
    this.currentProgress = clamp01(progress);
    this.targetPosition = this.currentProgress * this.trackHeight;
    const percentage = Math.round(this.currentProgress * 100);
    this.progressLabel.textContent = this.currentProgress.toFixed(2);
    this.track.setAttribute("aria-valuenow", percentage.toString());
    this.track.setAttribute("aria-valuetext", this.currentProgress.toFixed(2));
    this.updateReadTicks();

    if (!this.visible) {
      return;
    }
    if (!this.positionInitialized || this.environment.reducedMotion()) {
      this.snapToTarget();
      return;
    }
    this.scheduleAnimation();
  }

  setActiveHeading(index: number): void {
    this.labels.forEach((label, labelIndex) => {
      if (labelIndex === index) {
        label.setAttribute("aria-current", "location");
      } else {
        label.removeAttribute("aria-current");
      }
    });
    this.headingTicks.forEach((tick, tickIndex) => {
      tick.classList.toggle("is-active", tickIndex === index);
    });
  }

  setExpanded(expanded: boolean): void {
    if (!expanded) {
      this.cancelCollapse();
    }
    this.root.classList.toggle("is-expanded", expanded);
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    this.root.hidden = !visible;
    if (!visible) {
      this.cancelAnimation();
      this.positionInitialized = false;
      this.setExpanded(false);
      return;
    }
    this.measureLayout();
  }

  refreshAppearance(): void {
    this.followObserver?.disconnect();
    this.followObserver = null;
    const setting = this.appearance.getOrbStyle();
    this.applyOrbStyle(resolveOrbStyle(setting, this.root.ownerDocument));
    if (setting !== "followFileExplorer") {
      return;
    }
    this.followObserver = this.environment.createMutationObserver(() => {
      if (!this.destroyed) {
        this.applyOrbStyle(resolveOrbStyle(setting, this.root.ownerDocument));
      }
    });
    this.followObserver.observe(this.root.ownerDocument.documentElement, {
      attributes: true,
      attributeFilter: ["data-orb-style"],
      subtree: true,
    });
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.cancelAnimation();
    this.cancelCollapse();
    this.followObserver?.disconnect();
    this.followObserver = null;
    if (this.orbImage) {
      this.orbImage.onerror = null;
      this.orbImage = null;
    }
    this.track.removeEventListener("pointerdown", this.handlePointerDown);
    this.track.removeEventListener("keydown", this.handleKeyDown);
    this.host.removeEventListener("pointermove", this.handlePointerMove);
    this.host.removeEventListener("pointerleave", this.handlePointerLeave);
    this.root.removeEventListener("focusin", this.handleFocusIn);
    this.root.removeEventListener("focusout", this.handleFocusOut);
    this.root.remove();
    this.ticks = [];
    this.headingTicks = [];
    this.labels = [];
    this.entries = [];
  }

  private measureLayout(): void {
    if (!this.visible || this.root.hidden) {
      this.needsLabelLayout = true;
      return;
    }
    const measuredTrackHeight = this.track.clientHeight
      || this.track.getBoundingClientRect().height;
    if (measuredTrackHeight > 0) {
      this.trackHeight = measuredTrackHeight;
    }
    this.tickYPositions = this.ticks.map((tick) => (
      Number(tick.dataset.progress ?? 0) * this.trackHeight
    ));
    this.headingTickYPositions = this.entries.map((entry) => (
      clamp01(entry.progress) * this.trackHeight
    ));
    const labelHeights = this.labels.map((label) => (
      label.getBoundingClientRect().height || label.scrollHeight || 20
    ));
    const resolved = resolveVariableLabelPositions(
      this.entries,
      this.trackHeight,
      labelHeights,
      LABEL_GAP,
    );
    this.labels.forEach((label, index) => {
      label.style.setProperty(
        "--crisp-reading-label-y",
        `${resolved[index]?.labelY ?? 0}px`,
      );
    });
    this.targetPosition = this.currentProgress * this.trackHeight;
    this.needsLabelLayout = false;
  }

  private snapToTarget(): void {
    this.cancelAnimation();
    this.displayedPosition = this.targetPosition;
    this.velocity = 0;
    this.positionInitialized = true;
    this.renderPosition();
  }

  private scheduleAnimation(): void {
    if (this.frameId !== null || this.destroyed || !this.visible) {
      return;
    }
    this.frameId = this.environment.requestAnimationFrame(this.handleAnimationFrame);
  }

  private readonly handleAnimationFrame = (timestamp: number): void => {
    this.frameId = null;
    if (this.destroyed || !this.visible) {
      return;
    }
    const delta = this.lastFrameTimestamp === null
      ? 1 / 60
      : (timestamp - this.lastFrameTimestamp) / 1000;
    this.lastFrameTimestamp = timestamp;
    const next = stepSpring(
      { position: this.displayedPosition, velocity: this.velocity },
      this.targetPosition,
      delta,
    );
    this.displayedPosition = next.position;
    this.velocity = next.velocity;
    if (isSpringSettled(next, this.targetPosition)) {
      this.displayedPosition = this.targetPosition;
      this.velocity = 0;
    }
    this.renderPosition();
    if (this.displayedPosition !== this.targetPosition || this.velocity !== 0) {
      this.scheduleAnimation();
    } else {
      this.lastFrameTimestamp = null;
    }
  };

  private cancelAnimation(): void {
    if (this.frameId !== null) {
      this.environment.cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.lastFrameTimestamp = null;
  }

  private renderPosition(): void {
    const normalizedPosition = this.trackHeight <= 0
      ? this.currentProgress
      : clamp01(this.displayedPosition / this.trackHeight);
    this.root.style.setProperty(
      "--crisp-reading-progress",
      normalizedPosition.toString(),
    );
    this.applyWave(this.ticks, this.tickYPositions);
    this.applyWave(this.headingTicks, this.headingTickYPositions);
    if (
      this.orbMedia
      && this.resolvedOrbStyle !== "default"
      && !STATIC_ORB_STYLES.has(this.resolvedOrbStyle)
      && !this.environment.reducedMotion()
    ) {
      this.orbMedia.style.transform =
        `rotate(${this.displayedPosition * ORB_ROTATION_PER_PX}deg)`;
    }
  }

  private applyWave(elements: readonly HTMLElement[], positions: readonly number[]): void {
    elements.forEach((element, index) => {
      const itemY = positions[index] ?? 0;
      const offset = isWithinWaveRadius(this.displayedPosition, itemY)
        ? -gaussianWaveOffset(this.displayedPosition, itemY)
        : 0;
      element.style.setProperty("--crisp-reading-wave-x", `${offset}px`);
    });
  }

  private applyOrbStyle(style: ResolvedOrbStyle): void {
    if (this.orbImage) {
      this.orbImage.onerror = null;
      this.orbImage = null;
    }
    this.orb.replaceChildren();
    this.orbMedia = null;
    this.resolvedOrbStyle = style;
    this.orb.dataset.orbStyle = style;
    if (style === "default") {
      return;
    }

    const inlineSvg = INLINE_ORB_SVGS[style];
    if (inlineSvg) {
      const wrapper = this.root.ownerDocument.createElement("span");
      wrapper.className = "crisp-reading-rail__orb-media";
      wrapper.innerHTML = inlineSvg;
      this.orb.append(wrapper);
      this.orbMedia = wrapper;
      this.renderPosition();
      return;
    }

    const assetPath = IMAGE_ORB_ASSETS[style];
    if (!assetPath) {
      this.applyOrbStyle("default");
      return;
    }
    const wrapper = this.root.ownerDocument.createElement("span");
    wrapper.className = "crisp-reading-rail__orb-media";
    const image = this.root.ownerDocument.createElement("img");
    image.className = "crisp-reading-rail__orb-image";
    image.alt = "";
    image.draggable = false;
    image.src = this.appearance.getAssetUrl(assetPath);
    image.onerror = () => {
      if (this.orbImage === image) {
        this.applyOrbStyle("default");
      }
    };
    wrapper.append(image);
    this.orb.append(wrapper);
    this.orbImage = image;
    this.orbMedia = wrapper;
    this.renderPosition();
  }

  private readonly handlePointerMove = (event: PointerEvent): void => {
    if (this.root.contains(event.target as Node | null)) {
      this.expandNow();
      return;
    }
    const bounds = this.root.getBoundingClientRect();
    const verticallyAligned = event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    const horizontallyNear = event.clientX >= bounds.left - PROXIMITY_DISTANCE
      && event.clientX <= bounds.right;
    if (verticallyAligned && horizontallyNear) {
      this.expandNow();
    } else {
      this.scheduleCollapse();
    }
  };

  private readonly handlePointerLeave = (): void => {
    this.scheduleCollapse();
  };

  private readonly handleFocusIn = (): void => {
    this.expandNow();
  };

  private readonly handleFocusOut = (event: FocusEvent): void => {
    if (this.root.contains(event.relatedTarget as Node | null)) {
      return;
    }
    this.scheduleCollapse();
  };

  private expandNow(): void {
    this.cancelCollapse();
    this.root.classList.add("is-expanded");
  }

  private scheduleCollapse(): void {
    if (!this.root.classList.contains("is-expanded") || this.collapseTimer !== null) {
      return;
    }
    this.collapseTimer = this.window.setTimeout(() => {
      this.collapseTimer = null;
      this.root.classList.remove("is-expanded");
    }, COLLAPSE_DELAY);
  }

  private cancelCollapse(): void {
    if (this.collapseTimer === null) {
      return;
    }
    this.window.clearTimeout(this.collapseTimer);
    this.collapseTimer = null;
  }

  private readonly handlePointerDown = (event: PointerEvent): void => {
    if ((event.target as Element | null)?.closest(".crisp-reading-rail__label")) {
      return;
    }
    const bounds = this.track.getBoundingClientRect();
    if (bounds.height <= 0) {
      return;
    }
    this.track.focus({ preventScroll: true });
    event.preventDefault();
    this.callbacks.onProgressSelect(
      progressFromPointer(event.clientY, bounds.top, bounds.height),
    );
  };

  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const changes: Record<string, number> = {
      ArrowDown: 0.01,
      ArrowLeft: -0.01,
      ArrowRight: 0.01,
      ArrowUp: -0.01,
      PageDown: 0.1,
      PageUp: -0.1,
    };
    let next: number | undefined;
    if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = 1;
    } else if (event.key in changes) {
      next = clamp01(this.currentProgress + changes[event.key]);
    }

    if (next === undefined) {
      return;
    }
    event.preventDefault();
    this.callbacks.onProgressSelect(next);
  };

  private updateReadTicks(): void {
    for (const tick of this.ticks) {
      const progress = Number(tick.dataset.progress ?? 0);
      tick.classList.toggle("is-read", progress <= this.currentProgress);
    }
  }
}
