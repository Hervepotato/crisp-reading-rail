// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { createAboutCard, createSettingGroup } from "../src/settings-ui";

describe("settings UI groups", () => {
  it("uses native details semantics without scripted close timers", () => {
    const container = document.createElement("div");
    const content = createSettingGroup(
      container,
      "Audio & touch feedback",
      "Quiet navigation sounds.",
      true,
    );
    const card = container.querySelector<HTMLDetailsElement>(
      "details.crisp-rr-setting-card",
    );
    const summary = card?.querySelector("summary.crisp-rr-setting-card__header");

    expect(card?.open).toBe(true);
    expect(summary?.textContent).toContain("Audio & touch feedback");
    expect(summary?.textContent).toContain("Quiet navigation sounds.");
    expect(content.classList.contains("crisp-rr-setting-card__content")).toBe(true);

    summary?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(card?.classList.contains("is-closing")).toBe(false);
  });

  it("shows the plugin purpose and a safe external author link", () => {
    const container = document.createElement("div");

    createAboutCard(
      container,
      "Crisp Reading Rail",
      "用阅读轨道、位置提示与快捷导航，让长文阅读始终知道自己在哪里。",
    );

    const card = container.querySelector(".crisp-rr-about");
    const author = card?.querySelector<HTMLAnchorElement>("a");
    expect(card?.querySelector("h3")?.textContent).toBe(
      "About Crisp Reading Rail",
    );
    expect(card?.textContent).toContain(
      "用阅读轨道、位置提示与快捷导航，让长文阅读始终知道自己在哪里。",
    );
    expect(author?.textContent).toBe("小红书 letschips");
    expect(author?.href).toBe("https://xhslink.cn/m/3MwtKu4822b");
    expect(author?.target).toBe("_blank");
    expect(author?.rel).toBe("noopener noreferrer");
  });
});
