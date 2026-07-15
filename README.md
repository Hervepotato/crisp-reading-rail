# Crisp Reading Rail

Crisp Reading Rail adds a compact reading-progress and heading-navigation rail to the right edge of each eligible Obsidian Markdown Reading view. Its restrained line, ticks, and accent orb are designed to sit alongside the visual language of Crisp File Explorer without occupying Obsidian's native right sidebar.

## Version 1 behavior

- Works in Markdown Reading view on desktop Obsidian.
- Shows progress from `0.00` to `1.00`, evenly distributed ticks, completed-tick state, and a theme-accent current-position marker.
- Reveals H2, H3, and H4 labels on hover or keyboard focus. H1, H5, H6, and headings inside embedded notes are excluded.
- Positions heading labels near their rendered document positions and separates labels that would overlap.
- Clicking a label jumps to its heading. Clicking the track jumps to the corresponding document position.
- Hides when the pane is narrower than 680 px or the note does not scroll.
- Gives every side-by-side Reading pane an independent rail.

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

The deployment command copies only `main.js`, `manifest.json`, and `styles.css` into `.obsidian/plugins/crisp-reading-rail`.

## Privacy and safety

Crisp Reading Rail does not access the network, collect telemetry, edit notes, change files, or alter the workspace layout. It reads only the metadata and rendered headings for currently open Markdown Reading panes.

## Known version 1 exclusions

Version 1 does not support Live Preview, Source mode, mobile layouts, custom appearance settings, native Outline replacement, embedded-note headings, or H1/H5/H6 navigation.

## Development

- `npm test` runs the Vitest suite.
- `npm run lint` checks source and tests.
- `npm run build` type-checks and creates the production `main.js` bundle.
- `npm run check` runs the complete automated gate.

## License

MIT
