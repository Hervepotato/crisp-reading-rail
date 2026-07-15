# Crisp Reading Rail v0.2 Interaction Design

## Goal

Upgrade the reading-view rail from a uniform progress ruler into a semantic article navigator that mirrors the useful behavior of Making Software while staying native to Obsidian.

## Scope

This release remains reading-view only. It preserves the existing per-pane controller, reading-progress slider, keyboard behavior, virtualized-heading fallback, and minimum pane-width rule.

## Rail geometry

The rail keeps a uniform field of fine progress ticks at roughly ten-pixel intervals. Heading ticks are rendered as a separate semantic layer at each outline entry's normalized `progress` value.

This produces content-proportional spacing without estimating word counts: a long section occupies more document progress and therefore contains more fine ticks before the next heading tick; a short section contains fewer. Existing rendered-heading measurement and source-line fallback continue to supply stable positions for both fully rendered and virtualized reading views.

Heading hierarchy is expressed through tick length:

- H2: 16px long
- H3: 14px long
- H4: 12px long
- All heading ticks: 2px thick

The active heading tick uses `--interactive-accent`. Other heading ticks use the normal text color at a restrained opacity.

## Proximity interaction

The labels expand when the pointer enters a proximity region extending approximately 96px to the left of the visible rail. Pointer-distance detection is used instead of a wide transparent overlay so the article remains clickable when the labels are collapsed.

The expanded label area is interactive. Entering it, focusing a label, or returning to the proximity region cancels any pending collapse.

When the pointer leaves both the proximity region and the expanded label area, collapse is delayed by 3000ms. During this grace period all labels remain visible and clickable. Destroying or hiding the rail clears the timer.

Keyboard focus keeps labels expanded until focus leaves the rail.

## Label appearance

Labels are borderless text with no panel background, rounded rectangle, or shadow. They retain right alignment, outline indentation, collision avoidance, ellipsis, and Obsidian UI typography.

- Default labels use `--text-normal`.
- The active label and hovered/focused label use `--interactive-accent`.
- The active label remains distinguishable without adding a surrounding box.

## Accessibility and input behavior

Heading labels remain real buttons with local click handlers. The progress track remains a local `role="slider"` with the existing pointer and keyboard navigation. Proximity expansion is additive and does not create global click handlers or change scroll ownership.

Focus-visible behavior must remain clear, using text color and an outline that does not resemble the removed label card border.

## Failure handling and cleanup

All pointer, focus, and timer listeners are owned by the rail view and removed by `destroy()`. Repeated outline refreshes replace heading ticks and labels without leaking listeners. Empty outlines still show the progress ruler but no heading ticks or labels.

## Verification

Automated tests must cover:

- heading ticks render separately at outline progress positions;
- H2/H3/H4 level metadata is present for styling;
- progress ticks remain evenly distributed independently of heading count;
- proximity entry expands labels;
- leaving starts a 3000ms grace period;
- re-entry or label interaction cancels collapse;
- labels remain clickable during the grace period;
- destroy clears timers and listeners;
- existing slider, keyboard, visibility, controller, and virtualized-heading tests remain green.

Manual verification in Obsidian must check a long reading-view note for unequal numbers of fine ticks between headings, clear heading marks, near-rail activation, borderless labels, theme-accent active state, delayed dismissal, and successful heading navigation during the delay.
