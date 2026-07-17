# Reading Rail Visual and Sound Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the persistent full-height reading-rail line, keep the orb-centered local focus gradient, and add an optional, default-muted, reading-safe interaction sound.

**Architecture:** Keep the visual change in `styles.css`. Add a focused `ReadingRailAudio` Web Audio service owned by the plugin, inject its small `RailSoundProvider` interface through the pane registry into each controller, and let controllers emit semantic tick/settle feedback only for direct rail interaction. Existing scroll and rendering paths never invoke audio.

**Tech Stack:** TypeScript, Obsidian plugin API, Web Audio API, Vitest/jsdom, CSS.

## Global Constraints

- Do not modify Crisp File Explorer.
- No persistent full-height vertical rule; retain the 192px orb-centered focus gradient.
- `soundEnabled` defaults to `false` and normal document scrolling remains silent.
- Add no audio assets, dependencies, network access, note changes, or mobile support.
- Preserve heading alignment, drag locking, reduced motion, labels, orb styles, and pane isolation.

---

### Task 1: Visual parity without a full-height rule

**Files:**
- Modify: `tests/styles.test.ts`
- Modify: `styles.css`

**Interfaces:**
- Consumes: existing `.crisp-reading-rail__line` and `.crisp-reading-rail__line-focus` DOM nodes.
- Produces: CSS with no rendered full-height `::before` rule and the existing 192px local gradient intact.

- [ ] **Step 1: Write the failing style test**

Add assertions that the line pseudo-element uses `content: none`, the focus-visible selector targets `.crisp-reading-rail__line-focus`, and the focus gradient remains 192px tall.

```ts
expect(css).toMatch(/\.crisp-reading-rail__line::before\s*{[\s\S]*?content: none;/);
expect(css).not.toMatch(/focus-visible[\s\S]*?\.crisp-reading-rail__line::before/);
expect(css).toMatch(/\.crisp-reading-rail__line-focus\s*{[\s\S]*?height: 192px;/);
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run tests/styles.test.ts`

Expected: FAIL because the full-height pseudo-element still has an empty-string content and keyboard focus still targets it.

- [ ] **Step 3: Implement the CSS change**

Set the pseudo-element to `content: none`, retain the local gradient, and move keyboard emphasis to the local focus element without layout animation.

```css
.crisp-reading-rail .crisp-reading-rail__line::before {
  content: none;
}

.crisp-reading-rail .crisp-reading-rail__track:focus-visible
  .crisp-reading-rail__line-focus {
  opacity: 1;
}
```

- [ ] **Step 4: Run the style test and verify GREEN**

Run: `npx vitest run tests/styles.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add styles.css tests/styles.test.ts
git commit -m "style: localize the reading rail focus line"
```

### Task 2: Default-muted sound setting

**Files:**
- Modify: `tests/settings.test.ts`
- Modify: `src/settings.ts`
- Modify: `src/main.ts`

**Interfaces:**
- Consumes: persisted unknown plugin data.
- Produces: `CrispReadingRailSettings.soundEnabled: boolean`, default `false`, plus one Obsidian toggle named `Navigation sound`.

- [ ] **Step 1: Write failing settings tests**

```ts
expect(DEFAULT_SETTINGS).toEqual({ orbStyle: "default", soundEnabled: false });
expect(normalizeSettings({ orbStyle: "gear", soundEnabled: true })).toEqual({
  orbStyle: "gear",
  soundEnabled: true,
});
expect(normalizeSettings({ soundEnabled: "yes" })).toEqual({
  orbStyle: "default",
  soundEnabled: false,
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run tests/settings.test.ts`

Expected: FAIL because `soundEnabled` does not exist.

- [ ] **Step 3: Implement normalization and toggle**

Add the boolean field and normalization:

```ts
export interface CrispReadingRailSettings {
  orbStyle: OrbStyleSetting;
  soundEnabled: boolean;
}

export const DEFAULT_SETTINGS = {
  orbStyle: "default",
  soundEnabled: false,
};

soundEnabled: candidate.soundEnabled === true,
```

Add a setting after Orb style:

```ts
new Setting(containerEl)
  .setName("Navigation sound")
  .setDesc("Play very soft feedback only when directly using the reading rail. Normal reading stays silent.")
  .addToggle((toggle) => toggle
    .setValue(this.plugin.settings.soundEnabled)
    .onChange(async (value) => {
      this.plugin.settings.soundEnabled = value;
      await this.plugin.saveSettings();
    }));
```

- [ ] **Step 4: Run settings tests and verify GREEN**

Run: `npx vitest run tests/settings.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/settings.ts src/main.ts tests/settings.test.ts
git commit -m "feat: add a default-muted navigation sound setting"
```

### Task 3: Quiet Web Audio service

**Files:**
- Create: `src/audio-feedback.ts`
- Create: `tests/audio-feedback.test.ts`

**Interfaces:**
- Produces: `RailSoundProvider { tick(): void; settle(): void }` and `ReadingRailAudio` with `tick()`, `settle()`, `destroy(): Promise<void>`.
- Consumes: `isEnabled: () => boolean`, an injected `ReadingRailAudioEnvironment`, and no plugin or DOM state.

- [ ] **Step 1: Write failing audio tests**

Test that disabled calls do not create a context; enabled tick lazily creates one; a second tick inside 90ms is ignored; settle uses a sine oscillator; failures do not throw; and destroy closes the context.

```ts
const audio = new ReadingRailAudio(() => enabled, environment);
audio.tick();
expect(environment.createContext).not.toHaveBeenCalled();
enabled = true;
audio.tick();
expect(environment.createContext).toHaveBeenCalledOnce();
audio.tick();
expect(context.createOscillator).toHaveBeenCalledOnce();
audio.settle();
expect(oscillators.at(-1)?.type).toBe("sine");
await audio.destroy();
expect(context.close).toHaveBeenCalledOnce();
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run tests/audio-feedback.test.ts`

Expected: FAIL because `src/audio-feedback.ts` does not exist.

- [ ] **Step 3: Implement the minimal service**

Use one lazy context and two oscillator envelopes:

```ts
export interface RailSoundProvider {
  tick(): void;
  settle(): void;
}

export class ReadingRailAudio implements RailSoundProvider {
  tick(): void {
    if (!this.isEnabled() || this.environment.now() - this.lastTickAt < 90) return;
    this.lastTickAt = this.environment.now();
    this.play({ type: "triangle", start: 560, end: 480, duration: 0.025, release: 0.045, volume: 0.008 });
  }

  settle(): void {
    if (!this.isEnabled()) return;
    this.play({ type: "sine", start: 440, end: 560, duration: 0.04, release: 0.06, volume: 0.01 });
  }
}
```

The complete implementation must use exponential gain ramps from and to `0.0001`, resume a suspended context, catch playback errors, and close the context during `destroy()`.

- [ ] **Step 4: Run audio tests and verify GREEN**

Run: `npx vitest run tests/audio-feedback.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/audio-feedback.ts tests/audio-feedback.test.ts
git commit -m "feat: synthesize quiet reading rail feedback"
```

### Task 4: Semantic sound integration

**Files:**
- Modify: `tests/reading-rail-controller.test.ts`
- Modify: `tests/reading-rail-view.test.ts`
- Modify: `tests/pane-registry.test.ts`
- Modify: `src/reading-rail-controller.ts`
- Modify: `src/reading-rail-view.ts`
- Modify: `src/pane-registry.ts`
- Modify: `src/main.ts`

**Interfaces:**
- Consumes: `RailSoundProvider` from Task 3.
- Produces: controller sound semantics and `RailViewCallbacks.onProgressDragCancel?(progress: number)`.

- [ ] **Step 1: Write failing interaction tests**

Add tests proving:

```ts
view.callbacks?.onProgressSelect(0.5);
expect(sound.settle).toHaveBeenCalledOnce();

view.callbacks?.onProgressDrag?.(0.1);
view.callbacks?.onProgressDrag?.(0.6);
expect(sound.tick).toHaveBeenCalledOnce();

scroller.dispatchEvent(new Event("scroll"));
clock.flushFrame();
expect(sound.tick).toHaveBeenCalledOnce();

view.callbacks?.onProgressDragCancel?.(0.6);
expect(sound.settle).toHaveBeenCalledOnce();
```

Extend view tests so `pointercancel`, window blur, and `setVisible(false)` call cancel instead of audible drag end. Extend registry tests to prove the same sound provider reaches every controller.

- [ ] **Step 2: Run targeted tests and verify RED**

Run: `npx vitest run tests/reading-rail-controller.test.ts tests/reading-rail-view.test.ts tests/pane-registry.test.ts`

Expected: FAIL because sound injection and drag cancellation callbacks do not exist.

- [ ] **Step 3: Implement controller and view semantics**

Add `sound?: RailSoundProvider` to registry and controller options. In the controller:

```ts
private lastDragHeadingIndex: number | null = null;

private dragToProgress(progress: number): void {
  const headingIndex = this.headingIndexAtProgress(progress);
  if (this.lastDragHeadingIndex !== null && headingIndex !== this.lastDragHeadingIndex) {
    this.sound?.tick();
  }
  this.lastDragHeadingIndex = headingIndex;
  // Existing immediate drag scroll logic remains unchanged.
}
```

Call `settle()` only from direct heading/track selection and normal drag completion. Cancellation clears drag state and stabilizes scroll without sound. Plugin unload calls `audio.destroy()` after controllers are destroyed.

- [ ] **Step 4: Run targeted tests and verify GREEN**

Run: `npx vitest run tests/reading-rail-controller.test.ts tests/reading-rail-view.test.ts tests/pane-registry.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/main.ts src/pane-registry.ts src/reading-rail-controller.ts src/reading-rail-view.ts tests/pane-registry.test.ts tests/reading-rail-controller.test.ts tests/reading-rail-view.test.ts
git commit -m "feat: add semantic reading rail sound feedback"
```

### Task 5: Release, motion review, and live verification

**Files:**
- Modify: `README.md`
- Modify: `manifest.json`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `versions.json`
- Generated: `main.js`

**Interfaces:**
- Consumes: all completed features.
- Produces: deployable version `0.3.5` and a sanitized prebuilt ZIP with no `data.json`.

- [ ] **Step 1: Update release metadata and docs**

Document the default-muted setting and interaction-only triggers. Bump manifest/package versions to `0.3.5` and add `"0.3.5": "1.6.0"` to `versions.json`.

- [ ] **Step 2: Run the complete automated gate**

Run: `npm run check && git diff --check`

Expected: all Vitest files pass; ESLint and TypeScript/esbuild exit 0; no whitespace errors.

- [ ] **Step 3: Run the motion review**

Verify no persistent line, no `transition: all`, only transform/opacity motion, the spring remains interruptible, hover motion is absent, and reduced motion still snaps movement. Decision must be Approve before deployment.

- [ ] **Step 4: Deploy and verify in Obsidian**

Deploy identical production artifacts to ALL and YS while preserving each `data.json`. Reload the plugin, verify one rail per active reading pane, confirm the local line follows the orb, normal scroll creates no audio context, the toggle enables direct-interaction sound, and `dev:errors` is empty.

- [ ] **Step 5: Build and audit the sanitized ZIP**

Package `main.js`, `manifest.json`, `styles.css`, `README.md`, `LICENSE`, and `assets/` only. Verify `data.json`, private paths, vault names, note titles, source, and `node_modules` are absent and that packaged runtime checksums match source.

- [ ] **Step 6: Commit**

```bash
git add README.md main.js manifest.json package.json package-lock.json versions.json
git commit -m "release: polish Crisp Reading Rail 0.3.5"
```
