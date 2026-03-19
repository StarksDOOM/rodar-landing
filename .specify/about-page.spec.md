# Specification: About Page

## Overview
A high-fidelity informational page describing Rodar.do's mission, legal compliance, and institutional values.

## Requirements
- **1:1 Code**: Must use the exact code providing by the user.
- **Bilingual Support**: Must support `es` and `en` via the `language` prop.
- **Responsive Design**: Must maintain visual fidelity across mobile and desktop.
- **Blur Effects**: Must implement heavy backdrop blur and glassmorphism as specified.
- **Navigation Integration**: Must be accessible via the "About" (Nosotros) link in the Header.

## Acceptance Criteria
- [ ] Renders without errors.
- [ ] Matches user-provided code 1:1.
- [ ] Background image is fixed and blurred correctly.
- [ ] Animations (`motion/react`) are smooth.
- [ ] Navigation from Home to About works via state in `App.tsx`.
