import { Plugin, PluginSettingTab, Setting } from "obsidian";
import { ORB_STYLE_OPTIONS, normalizeOrbStyle } from "./orb-styles";
import { ReadingPaneRegistry } from "./pane-registry";
import {
  DEFAULT_SETTINGS,
  normalizeSettings,
  type CrispReadingRailSettings,
} from "./settings";

export default class CrispReadingRailPlugin extends Plugin {
  settings: CrispReadingRailSettings = { ...DEFAULT_SETTINGS };
  private registry: ReadingPaneRegistry | null = null;
  private reconcileFrame: number | null = null;
  private unloaded = false;

  async onload(): Promise<void> {
    this.settings = normalizeSettings(await this.loadData());
    this.addSettingTab(new CrispReadingRailSettingTab(this));
    this.app.workspace.onLayoutReady(() => {
      if (this.unloaded) {
        return;
      }
      this.registry = new ReadingPaneRegistry(this.app, {
        appearance: {
          getOrbStyle: () => this.settings.orbStyle,
          getAssetUrl: (path) => this.getAssetUrl(path),
        },
      });
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

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
    this.registry?.refreshAppearance();
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

  private getAssetUrl(path: string): string {
    const pluginDirectory = this.manifest.dir
      ?? `.obsidian/plugins/${this.manifest.id}`;
    return this.app.vault.adapter.getResourcePath(`${pluginDirectory}/${path}`);
  }
}

class CrispReadingRailSettingTab extends PluginSettingTab {
  private readonly plugin: CrispReadingRailPlugin;

  constructor(plugin: CrispReadingRailPlugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Orb style")
      .setDesc("Choose the reading-position orb appearance.")
      .addDropdown((dropdown) => {
        for (const option of ORB_STYLE_OPTIONS) {
          dropdown.addOption(option.value, option.label);
        }
        dropdown
          .setValue(this.plugin.settings.orbStyle)
          .onChange(async (value) => {
            this.plugin.settings.orbStyle = normalizeOrbStyle(value);
            await this.plugin.saveSettings();
          });
      });
  }
}
