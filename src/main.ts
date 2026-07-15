import { Plugin } from "obsidian";
import { ReadingPaneRegistry } from "./pane-registry";

export default class CrispReadingRailPlugin extends Plugin {
  private registry: ReadingPaneRegistry | null = null;
  private reconcileFrame: number | null = null;
  private unloaded = false;

  onload(): void {
    this.app.workspace.onLayoutReady(() => {
      if (this.unloaded) {
        return;
      }
      this.registry = new ReadingPaneRegistry(this.app);
      this.registry.reconcile();

      const scheduleReconcile = (): void => this.scheduleReconcile();
      this.registerEvent(this.app.workspace.on("layout-change", scheduleReconcile));
      this.registerEvent(this.app.workspace.on("active-leaf-change", scheduleReconcile));
      this.registerEvent(this.app.workspace.on("file-open", scheduleReconcile));
      this.registerEvent(this.app.workspace.on("window-open", scheduleReconcile));
      this.registerEvent(this.app.workspace.on("window-close", scheduleReconcile));
      this.registerEvent(this.app.metadataCache.on("changed", (file) => {
        this.registry?.refreshFile(file);
      }));
    });
  }

  onunload(): void {
    this.unloaded = true;
    const window = this.app.workspace.containerEl.ownerDocument.defaultView;
    if (this.reconcileFrame !== null && window) {
      window.cancelAnimationFrame(this.reconcileFrame);
      this.reconcileFrame = null;
    }
    this.registry?.destroy();
    this.registry = null;
  }

  private scheduleReconcile(): void {
    if (this.unloaded || this.reconcileFrame !== null) {
      return;
    }
    const window = this.app.workspace.containerEl.ownerDocument.defaultView;
    if (!window) {
      return;
    }
    this.reconcileFrame = window.requestAnimationFrame(() => {
      this.reconcileFrame = null;
      if (!this.unloaded) {
        this.registry?.reconcile();
      }
    });
  }
}
