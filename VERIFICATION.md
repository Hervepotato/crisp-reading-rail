# Crisp Reading Rail verification

## v0.3.0

Verified on 2026-07-15 with Obsidian Desktop 1.12.7 in the ALL vault.

### Automated gate

`npm run check` passed with 9 test files and 49 tests. ESLint, TypeScript, production esbuild, `node --check main.js`, manifest assertions, and `git diff --check` all passed.

The new coverage includes spring convergence and frame-delta clamping; Gaussian wave geometry and dynamic-radius reset; first-render/hidden-to-visible snapping; reduced motion; all 22 Orb setting values; all 19 material mappings; deterministic daily random; same-document Crisp File Explorer following and fallback; inline/file-backed media and image-error fallback; character rotation suppression; variable-height/over-constrained label layout; live-pane appearance propagation; observer/frame/timer/listener cleanup; and asset-aware deployment that preserves `data.json`.

### Live Obsidian acceptance

The 0.3.0 runtime was deployed to the ALL vault and loaded by toggling only Crisp Reading Rail. The live plugin exposed **Settings → Crisp Reading Rail → Orb style** with all approved options from Follow Crisp File Explorer through Taiga.

Verified in a long Markdown Reading-view note:

- the progress number rendered as accent-colored text without a surrounding card;
- the default and file-backed Gear orbs rendered successfully and changed immediately without pane recreation;
- nearby fine/heading marks bent left around the orb while distant marks remained aligned;
- H2-H4 labels appeared when approaching the rail, remained pure text overlays, and long labels wrapped without changing article width;
- clicking an expanded title navigated from `0.47` to `0.50`;
- after moving away, accessibility inspection still found the labels before the grace period ended and no longer found them after 3200ms;
- the filtered Developer Console contained no `crisp-reading-rail` message or error (one pre-existing Obsidian measurement warning was unrelated);
- the temporary Gear test selection persisted correctly, and subsequent user-side Orb changes continued to save live.

Every deployed `main.js`, `manifest.json`, `styles.css`, SVG, and PNG matched the repository source byte for byte. The final first-visible-frame regression fix was then rebuilt, passed the full 49-test gate, and redeployed byte-identically.

### Automated-only acceptance

Random per day, live companion-style mutation, missing-companion fallback, image failure fallback, character-upright behavior, reduced-motion snapping, multiple panes, and narrow/edit/hidden-state cleanup are covered by deterministic automated tests. They were not all exercised manually for every one of the 19 material choices in the final Obsidian session.

## v0.2.0

Verified on 2026-07-15 with Obsidian Desktop 1.12.7 in the ALL vault.

### Automated gate

`npm run check` passed with 6 test files and 25 tests. ESLint, TypeScript, and the production esbuild bundle all passed. The tests include separate semantic heading ticks, H2-H4 level metadata, 96px proximity activation, an exact 3000ms collapse delay, re-entry cancellation, clickable labels during the grace period, and listener/timer cleanup.

### Live Obsidian acceptance

The 0.2.0 runtime was deployed and reloaded by disabling and re-enabling only Crisp Reading Rail. Source and runtime `main.js`, `styles.css`, and `manifest.json` matched byte for byte.

Developer Tools inspection of the visible long-note rail reported:

- 119 fine progress ticks and 8 semantic heading ticks;
- H2 marks at `16px × 2px` and H3 marks at `14px × 2px` (H4 uses the tested 12px default);
- fine-tick counts of `3, 38, 18, 16, 13, 12, 15` between successive heading marks, confirming content-proportional section spacing;
- label `border: none` and a transparent background;
- the active label resolved to the current Obsidian `--interactive-accent` color;
- a synthetic pointer position 80px left of the rail expanded labels;
- labels remained expanded at 2800ms and were collapsed after 3200ms;
- clicking the final label during the grace period changed the Reading-view scroll position from `0` to `19864.5` and the rail value to `0.98`;
- no uncaught, type, reference, or `plugin:crisp-reading-rail` console error.

The final Obsidian state was restored to the top of the note with Developer Tools closed and the v0.2.0 plugin enabled.

## v0.1.0

Verified on 2026-07-15 with Obsidian Desktop 1.12.7 in the ALL vault.

### Automated gate

The final gate covers progress geometry, outline matching and collision handling, Obsidian virtualized headings, accessible DOM structure, local pointer and keyboard behavior, reduced motion, long-distance navigation, controller cleanup, pane reconciliation, real Reading-view wrapper resolution, and deployment packaging.

Final commands:

```text
npm ci
npm run check
node --check main.js
manifest field assertion
npm run deploy -- <ALL vault>
runtime/source SHA-256 comparison
```

Result: all commands exited successfully. Vitest reported 6 test files and 22 passing tests. ESLint, TypeScript, esbuild, JavaScript syntax, and manifest assertions passed.

### Obsidian acceptance

| Check | Result | Current evidence |
| --- | --- | --- |
| Long Reading-view note | Pass | Right-edge guide, ticks, accent marker, decimal progress, and all eight H2-H4 labels rendered in the 738-line implementation-plan note. |
| Scroll synchronization | Pass | Track click changed `0.00` to `0.50`; normal scrolling and jumps updated the slider value and active marker. |
| Heading navigation | Pass | The visible Task 6 label moved the rail to `0.89`, and the actual `Task 6: Package, deploy, and verify v1 in the real ALL vault` H3 entered the rendered viewport. |
| Proportional and keyboard navigation | Pass | Track click navigated proportionally. Focused slider exposed Arrow/Page/Home/End controls; Home changed `0.50` to `0.00`. |
| Reading-view-only visibility | Pass | Switching the long note to Edit mode removed the rail; returning to Reading mode restored it. A short `笔记测试` note, the Graph view, and narrow split panes showed no rail. |
| Multiple panes | Pass | Two side-by-side Reading panes displayed independent sliders at `0.87` and `0.00`. |
| Core views and companion plugin | Pass | File explorer/Crisp File Explorer, Search, Bookmarks, built-in Outline, Command palette, Graph shortcut, tab close, and mode toggle continued to work while the rail was active. |
| Unload cleanup | Pass | Runtime disable returned `rails: 0` and `loaded: false`; re-enable recreated the rail. No `plugin:crisp-reading-rail` console error appeared. |
| Reduced motion | Pass | Automated controller test selected `auto` scrolling when reduced motion is requested. CSS removes nonessential transitions under `prefers-reduced-motion: reduce`. |
| Light and dark themes | Pass | Obsidian theme toggle was exercised; the rail retained contrast through theme variables and the original light state was restored afterward. |

### Screenshots

- `verification/collapsed-light.jpeg` — collapsed rail in the light theme.
- `verification/focus-expanded-full-outline-light.jpeg` — focused rail with the full virtualized outline distributed down the article.
- `verification/two-pane-independent-light.jpeg` — two Reading panes with independent progress values.
- `verification/collapsed-dark.jpeg` — collapsed rail while Obsidian reported `theme-dark`.

### Deployment

Runtime directory:

```text
/Users/xiaohetongxue/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-reading-rail
```

The runtime directory contains exactly `main.js`, `manifest.json`, and `styles.css`. Each deployed artifact matched its source artifact byte for byte. The plugin id remains present in `.obsidian/community-plugins.json`, and the final Obsidian state has one active Reading rail with Developer Tools closed.
