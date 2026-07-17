# Crisp Reading Rail Visual and Sound Design

## Goal

Bring the right-side reading rail closer to Crisp File Explorer without changing the left-side plugin. Remove the persistent full-height vertical rule, retain the moving local focus line, and add optional reading-safe interaction sounds.

## Visual behavior

- The rail has no persistent full-height vertical rule.
- Fine ticks and proportional H2-H4 heading ticks remain visible.
- A 192px vertical gradient stays centered on the orb and follows its spring or drag position.
- Keyboard focus emphasizes the local gradient only; it must not restore a full-height rule.
- Existing orb, wave, heading-label, drag, reduced-motion, and exact heading-alignment behavior remains unchanged.

## Sound behavior

- Add one `Navigation sound` setting backed by `soundEnabled: boolean`.
- The default is `false`, including repaired legacy or invalid settings.
- Normal wheel, touchpad, touch, keyboard, and programmatic document scrolling stays silent.
- During direct orb dragging, crossing a different heading mark may play one very quiet tick.
- Finishing an orb drag, selecting a heading label, or clicking the track may play one quiet settle sound.
- Pointer cancellation, hidden rails, plugin unload, and non-user refreshes do not play sound.
- Tick playback is rate-limited so dense headings cannot chatter.

## Audio architecture

- A plugin-owned `ReadingRailAudio` service lazily creates one Web Audio context after a user gesture.
- It synthesizes short oscillator envelopes; no audio assets, network requests, or vault files are added.
- The service exposes only `tick()`, `settle()`, and `destroy()`.
- Controllers receive a small optional sound provider from the pane registry. They decide when a semantic interaction warrants feedback.
- The provider checks the live setting before every sound, so toggling sound does not rebuild panes.
- Audio failures are swallowed after a debug message and never interfere with navigation.

## Sound character

- Tick: a short, low-volume triangle tone with a soft downward pitch movement.
- Settle: a slightly longer, low-volume sine tone with a gentle upward movement.
- Both use short attack/release envelopes and conservative gain, substantially quieter than Crisp File Explorer's playful styles.

## Testing

- Settings tests cover default mute, valid booleans, and invalid-value repair.
- Style tests prove the full-height rule is absent while the 192px local gradient remains.
- Controller tests prove normal scrolling is silent, direct heading/track interaction settles once, and drag ticks only when crossing headings.
- Audio unit tests cover lazy context creation, throttling, envelopes, safe failure, and cleanup.
- Existing full suite, lint, type-check, production build, and live Obsidian checks must pass.

## Non-goals

- No sound-style menu, volume slider, audio files, scroll sonification, mobile support, or Crisp File Explorer code changes.
- No changes to heading navigation, orb assets, layout thresholds, or note content.
