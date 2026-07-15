# Crisp Reading Rail

Crisp Reading Rail adds a compact reading-progress and heading-navigation rail to the right edge of each eligible Obsidian Markdown Reading view. Its restrained line, proportional heading marks, animated wave, and optional orbs sit alongside the visual language of Crisp File Explorer without occupying Obsidian's native right sidebar.

## v0.3 behavior

- Works in Markdown Reading view on desktop Obsidian.
- Shows borderless progress from `0.00` to `1.00`, completed-tick state, content-proportional H2-H4 marks, and a spring-following current-position orb.
- Bends nearby fine and heading marks leftward in a natural wave while scrolling. Reduced-motion mode snaps directly to the reading position.
- Reveals H2, H3, and H4 labels when the pointer comes within 96px, on hover, or on keyboard focus. Labels remain clickable for three seconds after leaving.
- Wraps long labels to at most three lines and uses their measured heights to prevent collisions without changing document layout.
- Clicking a label jumps to its heading. Clicking the track jumps to the corresponding document position.
- Hides when the pane is narrower than 680 px or the note does not scroll.
- Gives every side-by-side Reading pane an independent rail.

## Orb style setting

Open **Settings → Crisp Reading Rail → Orb style** to choose Default, Random per day, 19 material/character styles, or **Follow Crisp File Explorer**. Follow mode observes only the companion orb's live `data-orb-style` value in the same Obsidian window; if it is unavailable, the rail uses Default.

All SVG and PNG resources used by Crisp Reading Rail are installed in this plugin's own `assets/` directory. It does not read Crisp File Explorer's files or private settings at runtime.

## Keyboard interaction

Focus the rail's single reading-position slider, then use:

- Arrow keys to move by 1%.
- Page Up and Page Down to move by 10%.
- Home and End to move to the beginning or end.
- Tab to reach visible native heading buttons.

Keyboard handling is local to the focused rail. The plugin does not register default hotkeys or intercept Obsidian shortcuts globally. Reduced-motion preferences replace smooth navigation with immediate movement.

## Local installation

1. Run `npm ci` and `npm run build`.
2. Run `npm run deploy -- "/path/to/your/vault"`.
3. In Obsidian, open **Settings → Community plugins**, reload plugins if needed, and enable **Crisp Reading Rail**.

The deployment command copies `main.js`, `manifest.json`, `styles.css`, and the complete `assets/` directory into `.obsidian/plugins/crisp-reading-rail`. Existing `data.json` settings are preserved.

## Privacy and safety

Crisp Reading Rail does not access the network, collect telemetry, edit notes, change files, or alter the workspace layout. It reads only the metadata and rendered headings for currently open Markdown Reading panes.

## Known exclusions

The plugin does not support Live Preview, Source mode, mobile layouts, native Outline replacement, embedded-note headings, or H1/H5/H6 navigation.

## Development

- `npm test` runs the Vitest suite.
- `npm run lint` checks source and tests.
- `npm run build` type-checks and creates the production `main.js` bundle.
- `npm run check` runs the complete automated gate.

## License

MIT
