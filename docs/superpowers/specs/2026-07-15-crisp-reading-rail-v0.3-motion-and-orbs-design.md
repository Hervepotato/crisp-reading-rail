# Crisp Reading Rail v0.3 Motion and Orb Design

## Goal

Turn the v0.2 reading rail into a smoother, more expressive article navigator by adding a spring-following orb, mirrored wave indentation, self-contained orb appearance settings, borderless progress text, and collision-safe multiline heading labels.

## Scope

Version 0.3 remains desktop-only and Markdown Reading-view-only. It preserves the existing 680px minimum pane width, H2-H4 outline scope, virtualized-heading fallback, progress slider semantics, keyboard navigation, 96px proximity activation, 3000ms label dismissal grace period, and per-pane controller isolation.

This release adds appearance settings but does not add sounds, draggable-orb navigation, mobile support, note mutation, network access, telemetry, or workspace layout changes.

## Architecture

The implementation is self-contained. Crisp Reading Rail owns its motion functions, orb definitions, copied orb assets, settings schema, rendering lifecycle, and deployment artifacts.

`Follow Crisp File Explorer` reads only the live `data-orb-style` value from a rendered `.crisp-fe-orb` element in the same Obsidian document. It does not import the other plugin, access its private settings object, or read its `data.json`. If no valid companion orb is present, the reading rail falls back to `default`.

The companion style is resolved separately for each Obsidian document so secondary windows remain independent. A narrowly filtered mutation observer watches only `data-orb-style` attribute changes and is disconnected when the rail view is destroyed.

## Motion model

The reading progress received by `setProgress()` becomes the motion target rather than the immediately rendered position. The displayed position follows that target with a damped spring based on the established Crisp File Explorer feel:

- stiffness: 380;
- damping: 24;
- rest position delta: 0.08px;
- rest speed: 0.5px/s;
- maximum frame delta: 1/30 second.

The spring state is expressed in track pixels, not normalized progress, so resizing can retarget without changing the logical reading position. The first render and hidden-to-visible transition initialize directly at the target to avoid a fly-in from the top.

Animation frames run only while the spring is unsettled or an orb rotation update is pending. `destroy()` and `setVisible(false)` cancel the frame, reset its timestamp, and prevent later DOM writes.

When `prefers-reduced-motion: reduce` is active, the displayed position moves directly to the target, orb rotation is disabled, and nonessential transitions are removed. The static wave shape may still reflect the current position because it does not animate independently.

## Mirrored wave rail

Both fine progress ticks and semantic H2-H4 ticks participate in the wave. Because the rail sits on the right edge, the wave mirrors Crisp File Explorer: marks translate left into the pane near the orb and return to their base alignment farther away.

The displacement uses a Gaussian influence centered on the displayed orb position:

- amplitude: 19.6px;
- sigma: 34px;
- dynamic render radius: 119px.

Only marks within the dynamic radius receive per-frame transforms. Marks leaving that range are returned to their base transform once. Heading tick width remains determined by level: H2 16px, H3 14px, and H4 12px, all 2px thick. Wave motion changes horizontal position but never changes the semantic tick's level width.

The active heading mark continues to use `--interactive-accent`. Fine tick read/unread opacity continues to reflect reading progress.

## Orb styles

The settings dropdown contains these values:

- Follow Crisp File Explorer
- Default
- Random per day
- Soccer
- Basketball
- Red ball
- Tennis
- Clown
- Dragon Ball
- Christmas Ball
- Orange Ball
- Blue Ball
- Character 1
- Character 2
- Character 3
- Fear
- Devil
- Ventilation fan
- Gear
- Alfresco
- Mercedes-Benz
- Taiga

`default` remains the default for existing and new users, so upgrading does not unexpectedly adopt the current File Explorer style. Invalid or removed values normalize to `default`.

`randomDaily` selects deterministically from the 19 material styles using the local calendar date. It does not include `default`, `followFileExplorer`, or itself.

Inline SVG orb definitions live in a focused source module. File-backed SVG and PNG assets are copied into the reading plugin's own `assets/` directory and deployed with the three existing runtime files. Asset URLs are resolved through the reading plugin's own resource path. A failed image load replaces that orb with the default theme orb without leaving a broken image.

All non-character material orbs rotate slightly as the displayed position changes. Character 1-3 stay upright. The default theme orb has no inner media rotation. The orb remains decorative and non-draggable; pointer and keyboard navigation continue to belong to the existing slider.

## Settings and propagation

The plugin loads one persisted setting:

```ts
interface CrispReadingRailSettings {
  orbStyle: OrbStyleSetting;
}
```

Saving a new value updates every live Reading pane immediately without destroying controllers or changing scroll position. New panes receive the current provider when the registry creates their controllers.

The settings page contains one section named `Orb style` with the description `Choose the reading-position orb appearance.` No other settings are added in v0.3.

## Progress text

The decimal progress indicator keeps its existing two-decimal format, monospace numerals, local slider synchronization, and vertical alignment with the displayed orb.

It removes the border, background, rounded rectangle, and card-like padding. The text uses the current Obsidian accent color with restrained opacity. It remains non-interactive and does not intercept pointer input.

## Multiline heading labels

Expanded labels remain borderless text overlays and never participate in document layout. They use absolute positioning inside the rail overlay and do not change the Markdown content width, line wrapping, or scroll height.

Each label uses:

- maximum width: `min(240px, 30vw)`;
- normal whitespace wrapping;
- maximum of three rendered lines;
- ellipsis/clipping beyond three lines;
- right-aligned text;
- existing H2-H4 indentation;
- current/hover/focus accent behavior.

After labels are inserted, the view measures their actual rendered heights and passes those heights to a pure variable-height collision resolver. The resolver preserves outline order, keeps a 4px minimum gap, clamps the group within the track, and handles an over-constrained rail by distributing labels monotonically rather than overlapping or escaping the viewport.

When the rail is hidden and therefore not measurable, it defers layout until the next visible refresh. Resize refreshes remeasure labels because wrapping width and height may change.

## Interaction behavior

The v0.2 proximity behavior remains authoritative:

- entering the 96px region left of the rail expands every label;
- entering a label, focusing a label, or returning to proximity cancels collapse;
- leaving starts one 3000ms timer;
- labels remain clickable during the timer;
- hidden or destroyed rails cancel the timer.

Wave animation does not expand labels and label expansion does not alter the spring target. Clicking a heading during spring movement navigates using the entry's document position, then the orb follows the new scroll position.

## Performance and cleanup

The view owns its animation frame, timestamp, spring state, orb media, companion-style observer, proximity listeners, focus listeners, and collapse timer. Every owned resource is removed or cancelled in `destroy()`.

The render loop avoids layout reads. Track height, fine tick Y positions, and heading tick Y positions are measured during outline/resize refresh, then reused during animation. Per-frame work is limited to the dynamic wave radius and the orb transform.

Repeated settings changes replace orb media without accumulating image listeners or observers. Repeated outline refreshes replace mark and label arrays while resetting stale transforms. Multiple Reading panes animate independently.

## Deployment

Version metadata advances to `0.3.0`. The deployment script copies:

- `main.js`;
- `manifest.json`;
- `styles.css`;
- the complete `assets/` directory.

The runtime install remains `.obsidian/plugins/crisp-reading-rail` in the selected vault. Deployment verification compares each runtime file and asset with its source counterpart.

## Testing and acceptance

Automated tests cover:

- spring convergence, frame-delta clamping, and reduced-motion snapping;
- Gaussian wave symmetry, decay, amplitude, and mirrored negative X transforms;
- dynamic-radius reset behavior;
- heading widths remaining independent from wave displacement;
- orb setting normalization and deterministic random-per-day resolution;
- companion DOM following and default fallback;
- all inline/file-backed orb style mappings and image-error fallback;
- immediate live-pane appearance refresh after a setting change;
- variable-height label collision resolution, three-line limits, ordering, and rail clamping;
- borderless progress and label semantics;
- animation-frame, observer, timer, and listener cleanup;
- asset-aware deployment;
- all existing v0.2 regressions.

Manual acceptance in Obsidian 1.12.7 checks:

- natural spring following during slow and fast wheel scrolling;
- leftward wave indentation around the orb with stable distant marks;
- no visible jitter after scrolling stops;
- every orb option, Random per day, and Follow Crisp File Explorer;
- live follow updates when the File Explorer orb changes and fallback when it is absent;
- upright character orbs and rotating material orbs;
- borderless progress text aligned with the orb;
- one-, two-, and three-line labels without overlap or content reflow;
- clickable labels during the dismissal grace period;
- narrow panes, hidden rails, edit mode, reload, multiple panes, and reduced motion;
- no `plugin:crisp-reading-rail` console errors;
- byte-identical deployed runtime files and assets.
