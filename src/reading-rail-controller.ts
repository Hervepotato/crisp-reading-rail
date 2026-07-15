import { collectRenderedHeadings } from "./heading-source";
import {
  activeHeadingIndex,
  buildOutlineEntries,
  resolveLabelPositions,
} from "./outline-model";
import { calculateProgress, calculateTickCount, clamp01 } from "./progress";
import { ReadingRailView } from "./reading-rail-view";
import type {
  RailAppearanceProvider,
  RailViewCallbacks,
} from "./reading-rail-view";
import type { OutlineEntry, OutlineHeading } from "./types";

const MIN_PANE_WIDTH = 680;
const TRACK_VERTICAL_INSET = 36;
const LABEL_HEIGHT = 20;
const LABEL_GAP = 4;
const HEADING_ACTIVATION_OFFSET = 80;
const STRUCTURE_REFRESH_DELAY = 80;

interface ResizeObserverHandle {
  observe(target: Element, options?: ResizeObserverOptions): void;
  disconnect(): void;
}

interface MutationObserverHandle {
  observe(target: Node, options?: MutationObserverInit): void;
  disconnect(): void;
}

export interface RailControllerEnvironment {
  requestAnimationFrame(callback: FrameRequestCallback): number;
  cancelAnimationFrame(id: number): void;
  setTimeout(callback: () => void, delay: number): number;
  clearTimeout(id: number): void;
  createResizeObserver(callback: () => void): ResizeObserverHandle;
  createMutationObserver(callback: () => void): MutationObserverHandle;
  reducedMotion(): boolean;
}

export interface RailView {
  setOutline(entries: readonly OutlineEntry[], tickCount: number): void;
  setProgress(progress: number): void;
  setActiveHeading(index: number): void;
  setExpanded(expanded: boolean): void;
  setVisible(visible: boolean): void;
  refreshAppearance(): void;
  destroy(): void;
}

export interface ReadingRailControllerOptions {
  host: HTMLElement;
  scroller: HTMLElement;
  preview: HTMLElement;
  getHeadings(): readonly OutlineHeading[];
  getLineCount?(): number;
  appearance?: RailAppearanceProvider;
  environment?: RailControllerEnvironment;
  createView?(
    host: HTMLElement,
    callbacks: RailViewCallbacks,
    appearance?: RailAppearanceProvider,
  ): RailView;
}

function createDefaultEnvironment(host: HTMLElement): RailControllerEnvironment {
  const window = host.ownerDocument.defaultView;
  if (!window) {
    throw new Error("Crisp Reading Rail requires a window-backed document.");
  }

  return {
    requestAnimationFrame: (callback) => window.requestAnimationFrame(callback),
    cancelAnimationFrame: (id) => window.cancelAnimationFrame(id),
    setTimeout: (callback, delay) => window.setTimeout(callback, delay),
    clearTimeout: (id) => window.clearTimeout(id),
    createResizeObserver: (callback) => new window.ResizeObserver(callback),
    createMutationObserver: (callback) => new window.MutationObserver(callback),
    reducedMotion: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

export class ReadingRailController {
  private readonly host: HTMLElement;
  private readonly scroller: HTMLElement;
  private readonly preview: HTMLElement;
  private readonly getHeadings: () => readonly OutlineHeading[];
  private readonly getLineCount: () => number;
  private readonly environment: RailControllerEnvironment;
  private readonly appearance?: RailAppearanceProvider;
  private readonly createView: (
    host: HTMLElement,
    callbacks: RailViewCallbacks,
    appearance?: RailAppearanceProvider,
  ) => RailView;
  private view: RailView | null = null;
  private resizeObserver: ResizeObserverHandle | null = null;
  private mutationObserver: MutationObserverHandle | null = null;
  private entries: OutlineEntry[] = [];
  private frameId: number | null = null;
  private refreshTimer: number | null = null;
  private pendingHeadingLine: number | null = null;
  private needsMeasurement = false;
  private started = false;
  private destroyed = false;

  constructor(options: ReadingRailControllerOptions) {
    this.host = options.host;
    this.scroller = options.scroller;
    this.preview = options.preview;
    this.getHeadings = options.getHeadings;
    this.getLineCount = options.getLineCount ?? (() => 0);
    this.appearance = options.appearance;
    this.environment = options.environment ?? createDefaultEnvironment(options.host);
    this.createView = options.createView ?? ((host, callbacks, appearance) => (
      ReadingRailView.mount(host, callbacks, { appearance })
    ));
  }

  start(): void {
    if (this.started || this.destroyed) {
      return;
    }
    this.started = true;
    this.view = this.createView(this.host, {
      onHeadingSelect: (entry) => this.navigateToHeading(entry),
      onProgressSelect: (progress) => this.navigateToProgress(progress),
    }, this.appearance);
    this.scroller.addEventListener("scroll", this.handleScroll, { passive: true });

    this.resizeObserver = this.environment.createResizeObserver(() => {
      this.scheduleFrame(true);
    });
    this.resizeObserver.observe(this.host);
    if (this.scroller !== this.host) {
      this.resizeObserver.observe(this.scroller);
    }

    this.mutationObserver = this.environment.createMutationObserver(() => {
      this.scheduleStructureRefresh();
    });
    this.mutationObserver.observe(this.preview, { childList: true, subtree: true });
    this.scheduleFrame(true);
  }

  refresh(): void {
    if (!this.started || this.destroyed || !this.view) {
      return;
    }

    const maxScroll = Math.max(0, this.scroller.scrollHeight - this.scroller.clientHeight);
    const trackHeight = Math.max(0, this.host.clientHeight - TRACK_VERTICAL_INSET);
    const visible = this.host.isConnected
      && this.host.clientWidth >= MIN_PANE_WIDTH
      && maxScroll > 0
      && trackHeight > 0;
    const rendered = collectRenderedHeadings(this.preview);
    const unresolvedEntries = buildOutlineEntries(
      this.getHeadings(),
      rendered,
      0,
      maxScroll,
      this.getLineCount(),
    );
    this.entries = resolveLabelPositions(
      unresolvedEntries,
      trackHeight,
      LABEL_HEIGHT,
      LABEL_GAP,
    );

    this.view.setOutline(this.entries, calculateTickCount(trackHeight));
    this.view.setVisible(visible);
    this.updateScrollState();
    this.finishPendingHeadingNavigation();
  }

  refreshAppearance(): void {
    if (!this.started || this.destroyed) {
      return;
    }
    this.view?.refreshAppearance();
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.scroller.removeEventListener("scroll", this.handleScroll);
    if (this.frameId !== null) {
      this.environment.cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    if (this.refreshTimer !== null) {
      this.environment.clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    this.resizeObserver = null;
    this.mutationObserver = null;
    this.view?.destroy();
    this.view = null;
    this.entries = [];
    this.pendingHeadingLine = null;
  }

  private readonly handleScroll = (): void => {
    this.scheduleFrame(false);
  };

  private scheduleFrame(needsMeasurement: boolean): void {
    if (this.destroyed) {
      return;
    }
    this.needsMeasurement ||= needsMeasurement;
    if (this.frameId !== null) {
      return;
    }
    this.frameId = this.environment.requestAnimationFrame(() => {
      this.frameId = null;
      if (this.destroyed) {
        return;
      }
      if (this.needsMeasurement) {
        this.needsMeasurement = false;
        this.refresh();
      } else {
        this.updateScrollState();
      }
    });
  }

  private scheduleStructureRefresh(): void {
    if (this.destroyed || this.refreshTimer !== null) {
      return;
    }
    this.refreshTimer = this.environment.setTimeout(() => {
      this.refreshTimer = null;
      this.scheduleFrame(true);
    }, STRUCTURE_REFRESH_DELAY);
  }

  private updateScrollState(): void {
    if (!this.view) {
      return;
    }
    const progress = calculateProgress(
      this.scroller.scrollTop,
      this.scroller.scrollHeight,
      this.scroller.clientHeight,
    );
    this.view.setProgress(progress);
    this.view.setActiveHeading(activeHeadingIndex(
      this.entries,
      this.scroller.scrollTop,
      HEADING_ACTIVATION_OFFSET,
    ));
  }

  private navigateToHeading(entry: OutlineEntry): void {
    if (entry.target?.isConnected) {
      this.pendingHeadingLine = null;
      this.scrollToTop(this.getRenderedHeadingTop(entry.target));
      return;
    }
    this.pendingHeadingLine = entry.sourceLine;
    this.scrollTo(clamp01(entry.progress));
  }

  private navigateToProgress(progress: number): void {
    this.pendingHeadingLine = null;
    this.scrollTo(clamp01(progress));
  }

  private finishPendingHeadingNavigation(): void {
    if (this.pendingHeadingLine === null) {
      return;
    }
    const entry = this.entries.find((candidate) => (
      candidate.sourceLine === this.pendingHeadingLine
      && candidate.target?.isConnected
    ));
    if (!entry?.target) {
      return;
    }
    this.pendingHeadingLine = null;
    this.scrollToTop(this.getRenderedHeadingTop(entry.target));
  }

  private getRenderedHeadingTop(target: HTMLElement): number {
    return target.getBoundingClientRect().top
      - this.scroller.getBoundingClientRect().top
      + this.scroller.scrollTop;
  }

  private scrollTo(progress: number): void {
    const maxScroll = Math.max(0, this.scroller.scrollHeight - this.scroller.clientHeight);
    this.scrollToTop(progress * maxScroll);
  }

  private scrollToTop(top: number): void {
    const maxScroll = Math.max(0, this.scroller.scrollHeight - this.scroller.clientHeight);
    const safeTop = Math.min(maxScroll, Math.max(0, top));
    this.scroller.scrollTo({
      top: safeTop,
      behavior: this.environment.reducedMotion() ? "auto" : "smooth",
    });
  }
}
