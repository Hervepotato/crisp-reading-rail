import { Notice, Plugin, PluginSettingTab, Setting } from "obsidian";
import {
  ReadingRailAudio,
  createReadingRailAudioEnvironment,
} from "./audio-feedback";
import {
  ORB_STYLE_OPTIONS,
  normalizeOrbStyle,
  type OrbStyleSetting,
} from "./orb-styles";
import { ReadingPaneRegistry } from "./pane-registry";
import {
  DEFAULT_SETTINGS,
  normalizeSettings,
  rewriteWaypointMapPaths,
  updateWaypointMap,
  type CrispReadingRailSettings,
} from "./settings";
import { createAboutCard, createSettingGroup } from "./settings-ui";
import { verifyLicenseCode } from "./license";
import {
  READING_RAIL_SOUND_STYLE_OPTIONS,
  normalizeSoundStyle,
} from "./sound-styles";

interface CompanionPluginRegistry {
  plugins?: {
    plugins?: Record<string, {
      settings?: {
        soundStyle?: unknown;
      };
    }>;
  };
}

const CYCLE_ORB_STYLES: readonly OrbStyleSetting[] = [
  "followFileExplorer",
  "default",
  "soccer",
  "basketball",
  "tennis",
  "clown",
  "pikachu",
  "gear",
];

export default class CrispReadingRailPlugin extends Plugin {
  settings: CrispReadingRailSettings = {
    ...DEFAULT_SETTINGS,
    waypoints: {},
  };
  private registry: ReadingPaneRegistry | null = null;
  private audio: ReadingRailAudio | null = null;
  private reconcileFrame: number | null = null;
  private saveQueue: Promise<void> = Promise.resolve();
  private unloaded = false;

  async onload(): Promise<void> {
    this.settings = normalizeSettings(await this.loadData());
    const window = this.app.workspace.containerEl.ownerDocument.defaultView;
    if (window) {
      this.audio = new ReadingRailAudio(
        () => this.settings.soundEnabled,
        createReadingRailAudioEnvironment(window),
        {
          getStyle: () => this.settings.soundStyle,
          getCompanionStyle: () => this.getCompanionSoundStyle(),
          isReleaseEnabled: () => this.settings.releaseSoundEnabled,
        },
      );
    }
    this.addSettingTab(new CrispReadingRailSettingTab(this));
    this.addCommand({
      id: "toggle-navigation-sound",
      name: "Toggle navigation sound",
      callback: async () => {
        this.settings.soundEnabled = !this.settings.soundEnabled;
        await this.saveSettings();
        new Notice(
          `Crisp Reading Rail sound ${
            this.settings.soundEnabled ? "enabled" : "muted"
          }`,
        );
      },
    });
    this.addCommand({
      id: "jump-to-next-heading",
      name: "Jump to next heading",
      callback: () => this.registry?.jumpNextHeading(),
    });
    this.addCommand({
      id: "jump-to-previous-heading",
      name: "Jump to previous heading",
      callback: () => this.registry?.jumpPreviousHeading(),
    });
    this.addCommand({
      id: "cycle-orb-style",
      name: "Cycle orb style",
      callback: async () => {
        const current = CYCLE_ORB_STYLES.indexOf(this.settings.orbStyle);
        this.settings.orbStyle = CYCLE_ORB_STYLES[
          (current + 1) % CYCLE_ORB_STYLES.length
        ];
        await this.saveSettings();
        new Notice(`Orb style set to: ${this.settings.orbStyle}`);
      },
    });
    this.app.workspace.onLayoutReady(() => {
      if (this.unloaded) {
        return;
      }
      this.registry = new ReadingPaneRegistry(this.app, {
        appearance: {
          getOrbStyle: () => this.settings.orbStyle,
          getAssetUrl: (path) => this.getAssetUrl(path),
        },
        sound: this.audio ?? undefined,
        waypoints: {
          get: (filePath) => this.settings.waypoints[filePath] ?? [],
          set: (filePath, waypoints) => this.updateWaypoints(filePath, waypoints),
        },
      });
      this.registry.reconcile();

      const scheduleReconcile = (): void => this.scheduleReconcile();
      this.registerEvent(this.app.workspace.on("layout-change", scheduleReconcile));
      this.registerEvent(this.app.workspace.on("active-leaf-change", scheduleReconcile));
      this.registerEvent(this.app.workspace.on("file-open", scheduleReconcile));
      this.registerEvent(this.app.workspace.on("window-open", scheduleReconcile));
      this.registerEvent(this.app.workspace.on("window-close", scheduleReconcile));
      this.registerEvent(this.app.vault.on("rename", (file, oldPath) => {
        this.rewriteWaypointPaths(oldPath, file.path);
      }));
      this.registerEvent(this.app.vault.on("delete", (file) => {
        this.rewriteWaypointPaths(file.path, null);
      }));
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
    const audio = this.audio;
    this.audio = null;
    if (audio) {
      void audio.destroy().catch((error) => {
        console.debug("Crisp Reading Rail audio cleanup failed", error);
      });
    }
  }

  async saveSettings(): Promise<void> {
    await this.persistSettings();
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

  private updateWaypoints(
    filePath: string,
    waypoints: readonly number[],
  ): void {
    this.settings.waypoints = updateWaypointMap(
      this.settings.waypoints,
      filePath,
      waypoints,
    );
    void this.persistSettings().catch((error) => {
      console.debug("Crisp Reading Rail waypoint save failed", error);
    });
  }

  private rewriteWaypointPaths(
    oldPath: string,
    newPath: string | null,
  ): void {
    const previous = this.settings.waypoints;
    const next = rewriteWaypointMapPaths(previous, oldPath, newPath);
    if (JSON.stringify(next) === JSON.stringify(previous)) {
      return;
    }
    this.settings.waypoints = next;
    void this.persistSettings().catch((error) => {
      console.debug("Crisp Reading Rail waypoint path save failed", error);
    });
  }

  private persistSettings(): Promise<void> {
    const snapshot = JSON.parse(JSON.stringify(
      this.settings,
    )) as CrispReadingRailSettings;
    const operation = this.saveQueue.then(() => this.saveData(snapshot));
    this.saveQueue = operation.catch((error) => {
      console.debug("Crisp Reading Rail settings save failed", error);
    });
    return operation;
  }

  private getCompanionSoundStyle(): unknown {
    const app = this.app as typeof this.app & CompanionPluginRegistry;
    return app.plugins?.plugins?.["crisp-file-explorer"]?.settings?.soundStyle;
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

    const licenseGroup = createSettingGroup(
      containerEl,
      "软件授权",
      "纯离线 Ed25519 密钥激活验证",
      true,
    );

    const statusSetting = new Setting(licenseGroup)
      .setName("当前激活状态")
      .setDesc("正在验证授权状态...");

    if (this.plugin.settings.licenseCode) {
      void verifyLicenseCode(this.plugin.settings.licenseCode, "crisp-reading-rail").then((verifyRes) => {
        if (verifyRes.valid && verifyRes.payload) {
          statusSetting.setDesc(
            `✅ 已激活（授权给: ${verifyRes.payload.userName}，到期时间: ${verifyRes.payload.expiresAt.split("T")[0]}）`,
          );
        } else {
          statusSetting.setDesc(
            `❌ 未激活（${verifyRes.reason || "授权码无效"}）`,
          );
        }
      });
    } else {
      statusSetting.setDesc("❌ 未激活（仅可使用默认足球小球，激活可解锁全套 3D 小球）");
    }

    new Setting(licenseGroup)
      .setName("输入授权码")
      .setDesc("粘贴购买获取的 Crisp Suite 授权字符串进行离线激活。")
      .addText((text) => text
        .setPlaceholder("粘贴 Crisp 授权码...")
        .setValue(this.plugin.settings.licenseCode)
        .onChange(async (value) => {
          this.plugin.settings.licenseCode = value.trim();
          await this.plugin.saveSettings();
        }))
      .addButton((button) => button
        .setButtonText("激活 / 重新验证")
        .setCta()
        .onClick(async () => {
          const result = await verifyLicenseCode(this.plugin.settings.licenseCode, "crisp-reading-rail");
          if (result.valid && result.payload) {
            new Notice(`🎉 Crisp Reading Rail 激活成功！欢迎使用，${result.payload.userName}`);
            this.display();
          } else {
            new Notice(`❌ 激活失败: ${result.reason}`);
          }
        }));

    const visualBody = createSettingGroup(
      containerEl,
      "Orb & visual appearance",
      "Reading-position orb style and companion tracking rules.",
      true,
    );

    new Setting(visualBody)
      .setName("Orb style")
      .setDesc("Choose the reading-position orb appearance.")
      .addDropdown((dropdown) => {
        for (const option of ORB_STYLE_OPTIONS) {
          dropdown.addOption(option.value, option.label);
        }
        dropdown
          .setValue(this.plugin.settings.orbStyle)
          .onChange(async (value) => {
            const selectedStyle = normalizeOrbStyle(value);
            if (selectedStyle !== "soccer") {
              const check = await verifyLicenseCode(this.plugin.settings.licenseCode, "crisp-reading-rail");
              if (!check.valid) {
                new Notice("🔒 切换其它小球属于 Crisp 激活用户专属功能（未激活仅可使用默认足球）");
                this.plugin.settings.orbStyle = "soccer";
                await this.plugin.saveSettings();
                this.display();
                return;
              }
            }
            this.plugin.settings.orbStyle = selectedStyle;
            await this.plugin.saveSettings();
          });
      });

    const audioBody = createSettingGroup(
      containerEl,
      "Audio & touch feedback",
      "Quiet feedback while dragging or navigating the reading rail.",
      true,
    );

    new Setting(audioBody)
      .setName("Navigation sound")
      .setDesc(
        "Play very soft feedback only when directly using the reading rail. Normal reading stays silent.",
      )
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.soundEnabled)
          .onChange(async (value) => {
            this.plugin.settings.soundEnabled = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(audioBody)
      .setName("Sound style")
      .setDesc(
        "Choose a quiet sound palette, or follow Crisp File Explorer's current sound style.",
      )
      .addDropdown((dropdown) => {
        for (const option of READING_RAIL_SOUND_STYLE_OPTIONS) {
          dropdown.addOption(option.value, option.label);
        }
        dropdown
          .setValue(this.plugin.settings.soundStyle)
          .onChange(async (value) => {
            this.plugin.settings.soundStyle = normalizeSoundStyle(value);
            await this.plugin.saveSettings();
          });
      });

    new Setting(audioBody)
      .setName("Release / settle sound")
      .setDesc(
        "Play a soft confirmation after a heading jump or completed drag.",
      )
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.releaseSoundEnabled)
          .onChange(async (value) => {
            this.plugin.settings.releaseSoundEnabled = value;
            await this.plugin.saveSettings();
          });
      });

    const outlineBody = createSettingGroup(
      containerEl,
      "Outline & reading rail interaction",
      "Heading navigation, reading waypoints, and keyboard controls.",
      false,
    );
    const description = outlineBody.ownerDocument.createElement("p");
    description.className = "setting-item-description";
    description.textContent = [
      "The rail indexes H2–H4 headings in Reading view. ",
      "Double-click the track or press M while it is focused to save a ",
      "waypoint for the current note. Right-click a waypoint, or focus it ",
      "and press Delete, to remove it.",
    ].join("");
    outlineBody.append(description);

    createAboutCard(
      containerEl,
      "Crisp Reading Rail",
      "用阅读轨道、位置提示与快捷导航，让长文阅读始终知道自己在哪里。",
    );
  }
}
