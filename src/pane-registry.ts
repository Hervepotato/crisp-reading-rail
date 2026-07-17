import { MarkdownView } from "obsidian";
import type { RailSoundProvider } from "./audio-feedback";
import { ReadingRailController } from "./reading-rail-controller";
import type { ReadingRailControllerOptions } from "./reading-rail-controller";
import type { RailAppearanceProvider } from "./reading-rail-view";
import type {
  CachedMetadata,
  MetadataCache,
  TFile,
  View,
  Workspace,
  WorkspaceLeaf,
} from "obsidian";

export interface ControllerLike {
  start(): void;
  refresh(): void;
  refreshAppearance(): void;
  destroy(): void;
}

interface RegistryContext {
  workspace: Pick<Workspace, "iterateAllLeaves">;
  metadataCache: Pick<MetadataCache, "getFileCache">;
}

interface PaneElements {
  host: HTMLElement;
  scroller: HTMLElement;
  preview: HTMLElement;
}

interface RegistryOptions {
  appearance?: RailAppearanceProvider;
  sound?: RailSoundProvider;
  isMarkdownView?(view: View): view is MarkdownView;
  resolveElements?(view: MarkdownView): PaneElements | null;
  createController?(options: ReadingRailControllerOptions): ControllerLike;
}

interface ControllerRecord extends PaneElements {
  view: MarkdownView;
  controller: ControllerLike;
}

interface TabGroupLike {
  type?: string;
  children?: readonly WorkspaceLeaf[];
  currentTab?: number;
}

function isSelectedTabLeaf(leaf: WorkspaceLeaf): boolean {
  const parent = (leaf as WorkspaceLeaf & { parent?: TabGroupLike }).parent;
  if (parent?.type !== "tabs") {
    return true;
  }
  if (!parent.children || !Number.isInteger(parent.currentTab)) {
    return true;
  }
  return parent.children[parent.currentTab as number] === leaf;
}

function defaultResolveElements(view: MarkdownView): PaneElements | null {
  const host = view.containerEl;
  const preview = view.previewMode?.containerEl;
  if (!host || !preview) {
    return null;
  }
  const scroller = preview.matches(".markdown-preview-view")
    ? preview
    : preview.querySelector<HTMLElement>(".markdown-preview-view")
      ?? preview.closest<HTMLElement>(".markdown-preview-view")
      ?? preview;
  return { host, scroller, preview: scroller };
}

export class ReadingPaneRegistry {
  private readonly context: RegistryContext;
  private readonly appearance?: RailAppearanceProvider;
  private readonly sound?: RailSoundProvider;
  private readonly isMarkdownView: (view: View) => view is MarkdownView;
  private readonly resolveElements: (view: MarkdownView) => PaneElements | null;
  private readonly createController: (options: ReadingRailControllerOptions) => ControllerLike;
  private readonly controllers = new Map<WorkspaceLeaf, ControllerRecord>();
  private destroyed = false;

  constructor(context: RegistryContext, options: RegistryOptions = {}) {
    this.context = context;
    this.appearance = options.appearance;
    this.sound = options.sound;
    this.isMarkdownView = options.isMarkdownView ?? (
      (view: View): view is MarkdownView => view instanceof MarkdownView
    );
    this.resolveElements = options.resolveElements ?? defaultResolveElements;
    this.createController = options.createController ?? (
      (controllerOptions) => new ReadingRailController(controllerOptions)
    );
  }

  reconcile(): void {
    if (this.destroyed) {
      return;
    }
    const eligible = new Set<WorkspaceLeaf>();

    this.context.workspace.iterateAllLeaves((leaf) => {
      if (!isSelectedTabLeaf(leaf)) {
        return;
      }
      const view = leaf.view;
      if (!this.isMarkdownView(view) || view.getMode() !== "preview") {
        return;
      }
      const elements = this.resolveElements(view);
      if (!elements) {
        return;
      }
      eligible.add(leaf);

      const existing = this.controllers.get(leaf);
      if (existing
        && existing.view === view
        && existing.host === elements.host
        && existing.scroller === elements.scroller
        && existing.preview === elements.preview) {
        return;
      }
      existing?.controller.destroy();

      const controller = this.createController({
        ...elements,
        appearance: this.appearance,
        sound: this.sound,
        getHeadings: () => this.getOutlineHeadings(view.file),
        getLineCount: () => view.getViewData().split(/\r?\n/).length,
      });
      this.controllers.set(leaf, { ...elements, view, controller });
      controller.start();
    });

    for (const [leaf, record] of this.controllers) {
      if (!eligible.has(leaf)) {
        record.controller.destroy();
        this.controllers.delete(leaf);
      }
    }
  }

  refreshFile(file: TFile): void {
    if (this.destroyed) {
      return;
    }
    for (const record of this.controllers.values()) {
      if (record.view.file === file || record.view.file?.path === file.path) {
        record.controller.refresh();
      }
    }
  }

  refreshAppearance(): void {
    if (this.destroyed) {
      return;
    }
    for (const record of this.controllers.values()) {
      record.controller.refreshAppearance();
    }
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }
    this.destroyed = true;
    for (const record of this.controllers.values()) {
      record.controller.destroy();
    }
    this.controllers.clear();
  }

  private getOutlineHeadings(file: TFile | null): Array<{
    text: string;
    level: number;
    sourceLine: number;
  }> {
    if (!file) {
      return [];
    }
    const cache: CachedMetadata | null = this.context.metadataCache.getFileCache(file);
    return (cache?.headings ?? []).map((heading) => ({
      text: heading.heading,
      level: heading.level,
      sourceLine: heading.position.start.line,
    }));
  }
}
