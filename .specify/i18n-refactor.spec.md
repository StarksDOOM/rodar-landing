# Specification: i18n Refactor

## Overview
Decentralize language-specific strings from individual components into centralized JSON files for better manageability and standard i18n practices.

## Requirements
- **Centralized Storage**: All UI strings must reside in `src/locales/es.json` and `src/locales/en.json`.
- **Maintain 1:1 Fidelity**: The rendered text must remain exactly as it was in the original component-level objects.
- **Type Safety**: Use a centralized translation utility or simple object mapping to ensure type safety for keys.
- **Support Language Switching**: Must work with the existing `language` state in `App.tsx`.

## Acceptance Criteria
- [ ] `es.json` and `en.json` contain all strings from Landing, About, Header, and Footer.
- [ ] Components import and use centralized translations.
- [ ] No hardcoded English/Spanish string objects remain in the components.
- [ ] Build passes and UI renders exactly as before.
