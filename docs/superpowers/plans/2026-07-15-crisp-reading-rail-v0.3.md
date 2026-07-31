# Crisp Reading Rail v0.3 Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship v0.3.0 with spring-following progress, a mirrored tick wave, self-contained/followable orb styles, borderless progress text, and collision-safe multiline labels.

**Architecture:** Keep pane discovery and reading-position calculation in the existing controller/registry. Add pure motion and orb-style modules, then let each `ReadingRailView` own its animation, media, DOM-follow observer, measurement cache, timers, and cleanup. Persist one plugin setting and propagate appearance changes to live controllers without rebuilding them.

**Tech Stack:** TypeScript, Obsidian Plugin API, DOM/CSS, Vitest, esbuild, Node deployment script.

---

## Task 1: Add deterministic motion primitives

**Files:**
- Create: `src/motion.ts`
- Create: `tests/motion.test.ts`

**Step 1: Write failing tests**

Cover spring convergence, maximum `dt` clamping, rest detection, exact target snapping, Gaussian peak/symmetry/decay, and the `119px` dynamic radius.

```ts
expect(gaussianWaveOffset(50, 50)).toBeCloseTo(19.6);
expect(gaussianWaveOffset(50, 75)).toBeCloseTo(gaussianWaveOffset(50, 25));
expect(isWithinWaveRadius(50, 170)).toBe(false);
```

Run `npm test -- --run tests/motion.test.ts` and confirm the module-not-found failure.

**Step 2: Implement the smallest pure module**

Export the approved constants, `SpringState`, `stepSpring`, `isSpringSettled`, `gaussianWaveOffset`, and `isWithinWaveRadius`. Clamp input frame delta to `1 / 30`; keep all functions free of DOM state.

**Step 3: Verify and commit**

Run `npm test -- --run tests/motion.test.ts`, then:

```bash
git add src/motion.ts tests/motion.test.ts
git commit -m "feat: add reading rail motion primitives"
```

## Task 2: Add orb style resolution and owned assets

**Files:**
- Create: `src/orb-styles.ts`
- Create: `tests/orb-styles.test.ts`
- Create: `assets/character1.png`
- Create: `assets/character2.png`
- Create: `assets/character3.png`
- Create: `assets/fear.svg`
- Create: `assets/devil.svg`
- Create: `assets/fan.svg`
- Create: `assets/gear.svg`
- Create: `assets/alfresco.svg`
- Create: `assets/mercedes.svg`
- Create: `assets/taiga.svg`

**Step 1: Write failing style-model tests**

Assert invalid persisted values normalize to `default`; all 22 dropdown values are present; the 19 material values have an inline SVG or owned asset mapping; daily random is deterministic for the local date; character styles are marked static; follow mode reads only `.crisp-fe-orb[data-orb-style]` from the supplied document and falls back to `default`.

Run `npm test -- --run tests/orb-styles.test.ts` and confirm failure.

**Step 2: Implement the orb catalog**

Define `MaterialOrbStyle`, `OrbStyleSetting`, `ResolvedOrbStyle`, `ORB_STYLE_OPTIONS`, `RANDOM_DAILY_ORB_STYLES`, `STATIC_ORB_STYLES`, inline SVG strings, owned asset mappings, `normalizeOrbStyle`, and `resolveOrbStyle`. Use a stable string hash of `YYYY-MM-DD` for daily selection. Do not read Crisp File Explorer files or settings at runtime.

**Step 3: Copy the approved file-backed assets**

Copy exact bytes from:

`$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-file-explorer/assets/`

into this plugin's `assets/`. Compare each source/destination file with `cmp`.

**Step 4: Verify and commit**

Run `npm test -- --run tests/orb-styles.test.ts`, then commit the module, tests, and assets.

## Task 3: Generalize label collision layout

**Files:**
- Modify: `src/outline-model.ts`
- Modify: `tests/outline-model.test.ts`

**Step 1: Add failing variable-height tests**

Test mixed one/two/three-line heights, 4px gaps, order preservation, top/bottom clamping, and an over-constrained track. Preserve current fixed-height callers through a compatible wrapper if useful.

```ts
const result = resolveVariableLabelPositions(targets, [18, 36, 54], 120, 4);
expect(result[1] - result[0]).toBeGreaterThanOrEqual(22);
```

**Step 2: Implement the pure resolver**

Lay out centers monotonically, push forward for collisions, shift the group back into bounds, then use an evenly distributed monotonic fallback when total requested height exceeds the track. Never return `NaN` or positions outside the rail.

**Step 3: Verify and commit**

Run `npm test -- --run tests/outline-model.test.ts`, then commit.

## Task 4: Integrate spring, wave, orb rendering, and multiline labels in the view

**Files:**
- Modify: `src/reading-rail-view.ts`
- Modify: `src/types.ts`
- Modify: `styles.css`
- Modify: `tests/reading-rail-view.test.ts`

**Step 1: Add failing view tests**

Use a controllable animation-frame environment. Cover: first-render snap; later spring frames; reduced-motion snap; negative-X wave transforms for nearby fine and heading ticks; reset outside the radius; unchanged H2/H3/H4 widths; character rotation suppression; material rotation; inline and file-backed media; image error fallback; same-document follow observer; observer/rAF/timer/listener cleanup; borderless progress; three-line clamping; variable label measurements and layout deferral while hidden.

Run `npm test -- --run tests/reading-rail-view.test.ts` and confirm the new expectations fail.

**Step 2: Extend the view contract**

Add appearance/environment inputs without moving ownership out of the view:

```ts
interface RailAppearanceProvider {
  getOrbStyle(): OrbStyleSetting;
  getAssetUrl(path: string): string;
}

interface ReadingRailView {
  refreshAppearance(): void;
  // existing methods remain
}
```

Keep defaults so test/mount callers that omit the provider still render the theme orb.

**Step 3: Implement the animation lifecycle**

Store logical progress, target Y, displayed Y, velocity, timestamp, measured tick Y values, and the scheduled frame id. Snap on first visible render and hidden-to-visible. During later updates, step the spring, set the progress/orb position, apply negative Gaussian X transforms only within 119px, and reset stale transforms once. Cancel on hide/destroy. With reduced motion, render synchronously and do not rotate media.

**Step 4: Implement orb media and follow behavior**

Resolve the configured style against `root.ownerDocument`; render default, inline SVG, or owned image; replace failed image media with the default orb; rotate non-character media using displayed position; observe only `data-orb-style` in follow mode; disconnect/reconnect without leaks when settings change.

**Step 5: Implement progress/label presentation**

Remove progress background/border/radius/card padding in CSS. Allow labels to wrap within `min(240px, 30vw)`, clamp to three lines, right-align, and remain absolute overlays. Measure label heights after insertion/visibility/resize and feed them to the variable resolver.

**Step 6: Verify and commit**

Run the view tests, then `npm test -- --run`. Commit the integrated view/CSS changes.

## Task 5: Persist settings and refresh every live pane

**Files:**
- Modify: `src/main.ts`
- Modify: `src/pane-registry.ts`
- Modify: `src/reading-rail-controller.ts`
- Modify: `tests/pane-registry.test.ts`
- Modify: `tests/reading-rail-controller.test.ts`
- Modify: `tests/obsidian-mock.ts`

**Step 1: Add failing propagation tests**

Extend controller doubles with `refreshAppearance()`. Assert the registry invokes it for every live controller without destroy/recreate, and newly created controllers receive the latest provider. Assert controller forwarding does not change progress or scroll state.

**Step 2: Implement setting persistence and UI**

Load `{ orbStyle: "default" }`, normalize persisted data, expose a setting tab named `Orb style`, populate the exact approved options, save on change, and call registry appearance refresh. Resolve asset URLs through the plugin's own vault adapter resource path.

**Step 3: Implement registry/controller forwarding**

Add `refreshAppearance()` to the controller contract and registry. Pass the live appearance provider to new views; do not rebuild pane controllers.

**Step 4: Verify and commit**

Run the controller/registry tests, typecheck/build, then commit.

## Task 6: Package v0.3, deploy assets, and update documentation

**Files:**
- Modify: `scripts/deploy.mjs`
- Modify: `tests/deploy.test.ts`
- Modify: `manifest.json`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `versions.json`
- Modify: `README.md`
- Modify: `VERIFICATION.md`

**Step 1: Add a failing deployment test**

Assert deploy copies the entire `assets/` tree and removes stale destination asset files while preserving other plugin data such as `data.json`.

**Step 2: Implement asset-aware deployment**

Copy `main.js`, `manifest.json`, `styles.css`, and recursively replace only the destination `assets/` directory. Keep the existing vault/plugin-id safety checks.

**Step 3: Bump and document the release**

Set package/manifest to `0.3.0`, add the version mapping, document the new Orb style setting, motion behavior, owned assets, Reading-view-only scope, and verification commands.

**Step 4: Run the automated release gate**

```bash
npm test -- --run
npm run check
npm run build
npm run deploy -- "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL"
```

Compare source/deployed `main.js`, `manifest.json`, `styles.css`, and every asset byte-for-byte. Confirm the runtime manifest is `0.3.0` and the plugin remains enabled.

**Step 5: Perform real Obsidian acceptance**

Reload the plugin/app and inspect a long Reading-view note. Check slow/fast scroll, wave direction, spring rest, all orb options, Random, Follow live update/fallback, borderless progress, 1-3 line labels, grace-period clicks, narrow/edit/hidden states, and the developer console for plugin errors. Record verified and unverified cases separately in `VERIFICATION.md`.

**Step 6: Final review and release commit**

Run `git diff --check`, `git status --short`, scan for placeholders/debug output, and inspect the complete diff. Commit the release only after all required gates pass.
