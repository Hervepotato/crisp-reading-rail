import { clamp01, progressFromPointer } from "./progress";
import type { OutlineEntry } from "./types";

export interface RailViewCallbacks {
  onHeadingSelect(entry: OutlineEntry): void;
  onProgressSelect(progress: number): void;
}

export class ReadingRailView {
  private readonly root: HTMLElement;
  private readonly track: HTMLElement;
  private readonly ticksContainer: HTMLElement;
  private readonly progressLabel: HTMLElement;
  private readonly labelsContainer: HTMLElement;
  private readonly callbacks: RailViewCallbacks;
  private ticks: HTMLElement[] = [];
  private labels: HTMLButtonElement[] = [];
  private currentProgress = 0;

  private constructor(host: HTMLElement, callbacks: RailViewCallbacks) {
    const document = host.ownerDocument;
    this.callbacks = callbacks;

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

    const active = document.createElement("div");
    active.className = "crisp-reading-rail__active";
    active.setAttribute("aria-hidden", "true");

    const orb = document.createElement("div");
    orb.className = "crisp-reading-rail__orb";
    orb.setAttribute("aria-hidden", "true");

    this.progressLabel = document.createElement("span");
    this.progressLabel.className = "crisp-reading-rail__progress";
    this.progressLabel.setAttribute("aria-hidden", "true");
    this.progressLabel.textContent = "0.00";

    this.labelsContainer = document.createElement("div");
    this.labelsContainer.className = "crisp-reading-rail__labels";

    this.track.append(
      this.ticksContainer,
      active,
      orb,
      this.progressLabel,
      this.labelsContainer,
    );
    this.root.append(this.track);
    host.append(this.root);

    this.track.addEventListener("pointerdown", this.handlePointerDown);
    this.track.addEventListener("keydown", this.handleKeyDown);
  }

  static mount(host: HTMLElement, callbacks: RailViewCallbacks): ReadingRailView {
    return new ReadingRailView(host, callbacks);
  }

  setOutline(entries: readonly OutlineEntry[], tickCount: number): void {
    const document = this.root.ownerDocument;
    const count = Math.max(0, Math.floor(tickCount));
    this.ticks = Array.from({ length: count }, (_, index) => {
      const tick = document.createElement("span");
      tick.className = "crisp-reading-rail__tick";
      tick.setAttribute("aria-hidden", "true");
      const progress = count <= 1 ? 0 : index / (count - 1);
      tick.dataset.progress = progress.toString();
      return tick;
    });
    this.ticksContainer.replaceChildren(...this.ticks);

    this.labels = entries.map((entry) => {
      const label = document.createElement("button");
      label.type = "button";
      label.className = "crisp-reading-rail__label";
      label.textContent = entry.text;
      label.style.setProperty("--crisp-reading-label-y", `${entry.labelY}px`);
      label.style.setProperty("--crisp-reading-level", String(entry.level - 2));
      label.addEventListener("click", () => this.callbacks.onHeadingSelect(entry));
      return label;
    });
    this.labelsContainer.replaceChildren(...this.labels);
    this.updateReadTicks();
  }

  setProgress(progress: number): void {
    this.currentProgress = clamp01(progress);
    const percentage = Math.round(this.currentProgress * 100);
    this.root.style.setProperty(
      "--crisp-reading-progress",
      this.currentProgress.toString(),
    );
    this.progressLabel.textContent = this.currentProgress.toFixed(2);
    this.track.setAttribute("aria-valuenow", percentage.toString());
    this.track.setAttribute("aria-valuetext", this.currentProgress.toFixed(2));
    this.updateReadTicks();
  }

  setActiveHeading(index: number): void {
    this.labels.forEach((label, labelIndex) => {
      if (labelIndex === index) {
        label.setAttribute("aria-current", "location");
      } else {
        label.removeAttribute("aria-current");
      }
    });
  }

  setExpanded(expanded: boolean): void {
    this.root.classList.toggle("is-expanded", expanded);
  }

  setVisible(visible: boolean): void {
    this.root.hidden = !visible;
  }

  destroy(): void {
    this.track.removeEventListener("pointerdown", this.handlePointerDown);
    this.track.removeEventListener("keydown", this.handleKeyDown);
    this.root.remove();
    this.ticks = [];
    this.labels = [];
  }

  private readonly handlePointerDown = (event: PointerEvent): void => {
    if ((event.target as Element | null)?.closest(".crisp-reading-rail__label")) {
      return;
    }
    const bounds = this.track.getBoundingClientRect();
    if (bounds.height <= 0) {
      return;
    }
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
