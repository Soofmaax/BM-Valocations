# Accessibility (a11y)

This project aims to offer a good baseline of accessibility.

## Features

- Skip link to main content (visible on keyboard focus)
- Route announcer (`aria-live="polite"`) for page changes
- Focus handler: moves keyboard focus to `<main>` after navigation
- Proper landmarks (`header`, `nav`, `main`)
- Semantic elements and accessible forms (labels, required, aria attributes)
- Keyboard-visible focus rings on interactive elements

## Linting

- `eslint-plugin-jsx-a11y` enforces common a11y best practices in JSX.

## Testing

- Consider adding tests for:
  - Skip link focusing main content
  - Focus visible on important controls
  - Presence of `aria-live` announcer content after navigation

## Guidance

- Maintain sufficient color contrast
- Ensure text alternatives for non-text content
- Preserve focus styles; do not remove outlines
- Use semantic HTML whenever possible