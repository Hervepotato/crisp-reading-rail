# Crisp Reading Rail v0.1.0 verification

Verified on 2026-07-15 with Obsidian Desktop 1.12.7 in the ALL vault.

## Automated gate

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

## Obsidian acceptance

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

## Screenshots

- `verification/collapsed-light.jpeg` — collapsed rail in the light theme.
- `verification/focus-expanded-full-outline-light.jpeg` — focused rail with the full virtualized outline distributed down the article.
- `verification/two-pane-independent-light.jpeg` — two Reading panes with independent progress values.
- `verification/collapsed-dark.jpeg` — collapsed rail while Obsidian reported `theme-dark`.

## Deployment

Runtime directory:

```text
/Users/xiaohetongxue/Library/Mobile Documents/iCloud~md~obsidian/Documents/ALL/.obsidian/plugins/crisp-reading-rail
```

The runtime directory contains exactly `main.js`, `manifest.json`, and `styles.css`. Each deployed artifact matched its source artifact byte for byte. The plugin id remains present in `.obsidian/community-plugins.json`, and the final Obsidian state has one active Reading rail with Developer Tools closed.
