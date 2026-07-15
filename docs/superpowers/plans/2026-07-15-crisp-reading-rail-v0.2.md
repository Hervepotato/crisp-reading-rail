# Crisp Reading Rail v0.2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add content-proportional semantic heading ticks, near-rail label activation, borderless theme-aware labels, and a three-second clickable dismissal grace period.

**Architecture:** Keep fine progress ticks independent from outline entries and add a second absolute heading-tick layer driven by each entry's normalized `progress`. Keep interaction ownership in `ReadingRailView`: it observes pointer movement within its pane, calculates a 96px proximity region without adding an input-blocking overlay, and owns the delayed-collapse timer and cleanup.

**Tech Stack:** TypeScript, Obsidian plugin API, DOM/CSS, Vitest with jsdom, ESLint, esbuild.

## Global Constraints

- Reading view only.
- Fine progress ticks remain spaced at roughly ten-pixel intervals.
- H2/H3/H4 heading ticks are 16/14/12px long and 2px thick.
- The pointer proximity region extends 96px left of the visible rail.
- Label collapse is delayed exactly 3000ms.
- Labels have no panel background, card border, rounded rectangle, or shadow.
- Active and hovered/focused labels use `--interactive-accent`; default labels use `--text-normal`.
- Existing slider semantics, keyboard navigation, virtualized-heading fallback, and 680px minimum pane width remain unchanged.

---

### Task 1: Semantic heading tick layer

**Files:**
- Modify: `src/reading-rail-view.ts`
- Modify: `styles.css`
- Test: `tests/reading-rail-view.test.ts`

**Interfaces:**
- Consumes: `OutlineEntry.progress: number` and `OutlineEntry.level: number`.
- Produces: `.crisp-reading-rail__heading-tick[data-level]` elements with `--crisp-reading-heading-progress` and active state synchronized by `setActiveHeading(index)`.

- [ ] **Step 1: Write the failing rendering test**

Add a three-entry fixture and assert that fine ticks remain at the requested count while a separate heading layer contains three marks with levels `2`, `3`, `4`, normalized progress variables, and one active mark:

```ts
const entries = [
  { ...makeEntry(), text: "H2", level: 2, progress: 0.1 },
  { ...makeEntry(), text: "H3", level: 3, progress: 0.5 },
  { ...makeEntry(), text: "H4", level: 4, progress: 0.9 },
];
view.setOutline(entries, 40);
view.setActiveHeading(1);
expect(host.querySelectorAll(".crisp-reading-rail__tick")).toHaveLength(40);
expect([...host.querySelectorAll<HTMLElement>(".crisp-reading-rail__heading-tick")].map((tick) => [
  tick.dataset.level,
  tick.style.getPropertyValue("--crisp-reading-heading-progress"),
])).toEqual([["2", "0.1"], ["3", "0.5"], ["4", "0.9"]]);
expect(host.querySelectorAll(".crisp-reading-rail__heading-tick.is-active")).toHaveLength(1);
```

- [ ] **Step 2: Run the focused test and verify red**

Run: `npm test -- --run tests/reading-rail-view.test.ts`

Expected: FAIL because `.crisp-reading-rail__heading-tick` does not exist.

- [ ] **Step 3: Implement the separate heading layer**

In `ReadingRailView`, create `headingTicksContainer`, append it between fine ticks and active progress decorations, and populate it independently:

```ts
this.headingTicks = entries.map((entry) => {
  const tick = document.createElement("span");
  tick.className = "crisp-reading-rail__heading-tick";
  tick.dataset.level = String(entry.level);
  tick.style.setProperty("--crisp-reading-heading-progress", String(clamp01(entry.progress)));
  tick.setAttribute("aria-hidden", "true");
  return tick;
});
```

Update `setActiveHeading` to toggle `.is-active` on the heading tick at the same index and clear `headingTicks` during `destroy()`.

Add absolute CSS positioning and hierarchy lengths:

```css
.crisp-reading-rail__heading-tick {
  position: absolute;
  top: calc(var(--crisp-reading-heading-progress) * 100%);
  right: 4px;
  width: 12px;
  height: 2px;
  background: var(--text-normal);
  opacity: 0.72;
  transform: translateY(-50%);
}
.crisp-reading-rail__heading-tick[data-level="2"] { width: 16px; }
.crisp-reading-rail__heading-tick[data-level="3"] { width: 14px; }
.crisp-reading-rail__heading-tick.is-active { background: var(--interactive-accent); opacity: 1; }
```

- [ ] **Step 4: Run the focused test and full suite**

Run: `npm test -- --run tests/reading-rail-view.test.ts && npm test`

Expected: focused and full suites PASS.

- [ ] **Step 5: Commit the independently testable geometry change**

```bash
git add src/reading-rail-view.ts styles.css tests/reading-rail-view.test.ts
git commit -m "feat: add semantic heading ticks"
```

### Task 2: Proximity expansion and delayed clickable dismissal

**Files:**
- Modify: `src/reading-rail-view.ts`
- Test: `tests/reading-rail-view.test.ts`

**Interfaces:**
- Consumes: pane-local pointer events and `root.getBoundingClientRect()`.
- Produces: `is-expanded` state with a 96px horizontal proximity threshold and one owned 3000ms collapse timer.

- [ ] **Step 1: Write failing fake-timer interaction tests**

Use `vi.useFakeTimers()` and a rail rectangle with `left: 870`, `right: 900`, `top: 18`, `bottom: 782`. Assert pointer movement at `clientX: 780` expands, movement at `clientX: 700` leaves the rail expanded for 2999ms, and the rail collapses at 3000ms. Then assert returning to `clientX: 780` cancels the timer and clicking the label during the grace period still invokes `onHeadingSelect`.

```ts
host.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, clientX: 780, clientY: 200 }));
expect(root).toHaveClass("is-expanded");
host.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, clientX: 700, clientY: 200 }));
vi.advanceTimersByTime(2999);
expect(root).toHaveClass("is-expanded");
label.click();
expect(onHeadingSelect).toHaveBeenCalledTimes(1);
vi.advanceTimersByTime(1);
expect(root).not.toHaveClass("is-expanded");
```

Add a cleanup assertion that destroying the view before advancing timers removes the root and produces no later state mutation.

- [ ] **Step 2: Run the focused tests and verify red**

Run: `npm test -- --run tests/reading-rail-view.test.ts`

Expected: FAIL because pointer proximity does not control `is-expanded` and no delayed collapse exists.

- [ ] **Step 3: Implement pane-local proximity and timer ownership**

Add constants and methods in `reading-rail-view.ts`:

```ts
const PROXIMITY_DISTANCE = 96;
const COLLAPSE_DELAY = 3000;

private expandNow(): void {
  this.cancelCollapse();
  this.setExpanded(true);
}

private scheduleCollapse(): void {
  if (!this.root.classList.contains("is-expanded") || this.collapseTimer !== null) return;
  this.collapseTimer = this.window.setTimeout(() => {
    this.collapseTimer = null;
    this.setExpanded(false);
  }, COLLAPSE_DELAY);
}
```

Listen to `pointermove` and `pointerleave` on the pane host plus `focusin` and `focusout` on the root. In `pointermove`, treat `root.contains(event.target)` as interactive; otherwise compare pointer coordinates with the root rectangle and expand only when the pointer is vertically aligned and no more than 96px left of the rail. Remove all listeners and clear the timer in `destroy()`; cancel and collapse when `setVisible(false)` is called.

- [ ] **Step 4: Run focused and regression tests**

Run: `npm test -- --run tests/reading-rail-view.test.ts && npm test`

Expected: all tests PASS with fake timers restored in `afterEach`.

- [ ] **Step 5: Commit the interaction change**

```bash
git add src/reading-rail-view.ts tests/reading-rail-view.test.ts
git commit -m "feat: add proximity label interaction"
```

### Task 3: Borderless labels, release metadata, deployment, and verification

**Files:**
- Modify: `styles.css`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `manifest.json`
- Modify: `versions.json`
- Deploy output: `/Users/xiaohetongxue/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-reading-rail/main.js`
- Deploy output: `/Users/xiaohetongxue/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-reading-rail/styles.css`
- Deploy output: `/Users/xiaohetongxue/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-reading-rail/manifest.json`

**Interfaces:**
- Consumes: Obsidian CSS variables and the `is-expanded`, `is-active`, `aria-current`, hover, and focus states from Tasks 1-2.
- Produces: the v0.2.0 runtime bundle installed in the active vault.

- [ ] **Step 1: Remove card styling and apply theme-aware text states**

Change `.crisp-reading-rail__label` to `padding: 1px 0`, `border: 0`, `border-radius: 0`, `background: transparent`, `box-shadow: none`, and `color: var(--text-normal)`. Make `[aria-current="location"]`, `:hover`, and `:focus-visible` use `color: var(--interactive-accent)`. Preserve a distinct `outline: 1px solid var(--interactive-accent)` with `outline-offset: 2px` only for `:focus-visible`.

- [ ] **Step 2: Update version metadata to 0.2.0**

Set `package.json`, `package-lock.json`, and `manifest.json` to `0.2.0`, then add:

```json
"0.2.0": "1.6.0"
```

to `versions.json` while retaining `0.1.0`.

- [ ] **Step 3: Run the complete quality gate**

Run: `npm run check`

Expected: Vitest, ESLint, TypeScript, and production esbuild all exit 0.

- [ ] **Step 4: Deploy and compare source/runtime artifacts**

Run: `npm run deploy`

Expected: deployment reports the active vault plugin directory. Then run:

```bash
cmp main.js "/Users/xiaohetongxue/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-reading-rail/main.js"
cmp styles.css "/Users/xiaohetongxue/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-reading-rail/styles.css"
cmp manifest.json "/Users/xiaohetongxue/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-reading-rail/manifest.json"
```

Expected: every `cmp` exits 0.

- [ ] **Step 5: Perform manual reading-view verification**

Reload Obsidian or toggle Crisp Reading Rail, open a long note in Reading view, and verify:

- long sections contain more fine ticks between their thick heading marks;
- H2/H3/H4 marks are visually distinct and current heading uses the theme accent;
- moving within roughly 96px of the rail expands all labels without requiring contact;
- labels are pure text with no card border or background;
- moving away leaves labels visible and clickable for three seconds;
- moving back cancels dismissal;
- clicking a label during the grace period scrolls to its heading;
- editing view and panes narrower than 680px do not show the rail;
- no errors attributed to `crisp-reading-rail` appear in the developer console.

- [ ] **Step 6: Commit the release**

```bash
git add styles.css package.json package-lock.json manifest.json versions.json main.js docs/superpowers/plans/2026-07-15-crisp-reading-rail-v0.2.md
git commit -m "release: complete crisp reading rail v0.2.0"
```
