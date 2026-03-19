# Specification: Contact Page

The Contact page provides a high-fidelity interface for users to reach out to Rodar. It includes a glassmorphism form with validation and a success state, as well as contact information.

## Requirements
- **1:1 Fidelity**: Use the user-provided code (Turn 1277) for layout, styling, and logic.
- **i18n Support**: Centralize all strings in `es.json` and `en.json` and use the `getTranslations` utility.
- **Email Submission (Resend)**:
  - **Recipient**: `rmansempire@gmail.com`
  - **Subject**: `Rodar Message from: <full_name>`
  - **Body**: Include Name, Email, and Message on separate lines.
  - **Security**: Must NOT expose the Resend API key on the client side.
- **Navigation**: Integrated into the `App.tsx` state-based navigation system.
- **Responsive Design**: Consistent look and feel across mobile and desktop.
- **Micro-animations**: Use `motion/react` for entry transitions.

## Acceptance Criteria
- [ ] Page renders correctly at `/` when `currentPage === 'contact'`.
- [ ] Language switching (ES/EN) works for all text.
- [ ] Form submission shows the success state.
- [ ] Glassmorphism and background blur match the About page style.
- [ ] "Contact" link in Header correctly navigates to this page.
