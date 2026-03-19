# Technical Plan: i18n Refactor

## Proposed Changes

### [New] Locales
- `[NEW] src/locales/es.json`
- `[NEW] src/locales/en.json`

### [New] Translation Utility
- `[NEW] src/lib/i18n.ts`: A simple utility to export the correct translation object based on the current language.

### [Modify] Components
- `Header.tsx`: Replace `navigation` object with `t.header`.
- `Footer.tsx`: Replace `text` object with `t.footer`.
- `LandingPage.tsx`: Replace `text` object with `t.landing`.
- `AboutPage.tsx`: Replace `text` object with `t.about`.

## Verification Plan

### Automated
- `npm run build` to verify no missing keys or type errors.

### Manual
- Toggle languages on both Landing and About pages.
- Verify that every piece of text matches the original user-provided code.
