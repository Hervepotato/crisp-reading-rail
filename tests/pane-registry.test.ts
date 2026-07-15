// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { ReadingPaneRegistry } from "../src/pane-registry";
import { MarkdownView } from "obsidian";
import type { View, WorkspaceLeaf } from "obsidian";

function makeController() {
  return {
    start: vi.fn(),
    refresh: vi.fn(),
    destroy: vi.fn(),
  };
}

describe("ReadingPaneRegistry", () => {
  it("finds the scrollable preview inside Obsidian's reading-view wrapper", () => {
    const host = document.createElement("div");
    const wrapper = document.createElement("div");
    wrapper.className = "markdown-reading-view";
    const scroller = document.createElement("div");
    scroller.className = "markdown-preview-view";
    wrapper.append(scroller);
    host.append(wrapper);

    const MarkdownViewWithoutLeaf = MarkdownView as unknown as new () => MarkdownView;
    const view = new MarkdownViewWithoutLeaf() as MarkdownView & {
      getMode(): "preview";
      file: { path: string };
      previewMode: { containerEl: HTMLElement };
    };
    Object.assign(view, {
      containerEl: host,
      file: { path: "long-note.md" },
      getMode: () => "preview",
      previewMode: { containerEl: wrapper },
    });
    const leaf = { view } as unknown as WorkspaceLeaf;
    const factory = vi.fn(() => makeController());
    const registry = new ReadingPaneRegistry(
      {
        workspace: { iterateAllLeaves: (callback) => callback(leaf) },
        metadataCache: { getFileCache: () => ({ headings: [] }) },
      },
      { createController: factory },
    );

    registry.reconcile();
    expect(factory).toHaveBeenCalledWith(expect.objectContaining({ scroller, preview: scroller }));
    registry.destroy();
  });

  it("creates, reuses, refreshes, and destroys pane-local controllers", () => {
    const file = { path: "long-note.md" };
    const readingView = {
      file,
      getMode: () => "preview",
    };
    const editView = {
      file: { path: "editing.md" },
      getMode: () => "source",
    };
    const otherView = { file: null };
    const leaves = [
      { view: readingView },
      { view: editView },
      { view: otherView },
    ] as unknown as WorkspaceLeaf[];
    const workspace = {
      iterateAllLeaves(callback: (leaf: WorkspaceLeaf) => void) {
        leaves.forEach(callback);
      },
    };
    const controller = makeController();
    const replacement = makeController();
    const host = document.createElement("div");
    const factory = vi.fn()
      .mockReturnValueOnce(controller)
      .mockReturnValueOnce(replacement);
    const registry = new ReadingPaneRegistry(
      {
        workspace,
        metadataCache: { getFileCache: () => ({ headings: [] }) },
      },
      {
        isMarkdownView: (view: View): view is MarkdownView => "getMode" in view,
        resolveElements: () => ({ host, scroller: host, preview: host }),
        createController: factory,
      },
    );

    registry.reconcile();
    expect(factory).toHaveBeenCalledTimes(1);
    expect(controller.start).toHaveBeenCalledTimes(1);

    registry.reconcile();
    expect(factory).toHaveBeenCalledTimes(1);

    registry.refreshFile(file as never);
    expect(controller.refresh).toHaveBeenCalledTimes(1);

    readingView.getMode = () => "source";
    registry.reconcile();
    expect(controller.destroy).toHaveBeenCalledTimes(1);

    readingView.getMode = () => "preview";
    registry.reconcile();
    expect(factory).toHaveBeenCalledTimes(2);
    registry.destroy();
    expect(replacement.destroy).toHaveBeenCalledTimes(1);
  });
});
