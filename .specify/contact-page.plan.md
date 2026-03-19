# Plan: Contact Page Implementation

## Objectives
Implement the Contact page using the 1:1 code provided by the user, while integrating it into the centralized i18n system.

## Proposed Changes

### [Backend/API] Resend Integration
- Implement an Edge Function or Serverless endpoint (if using Vercel/Netlify) or a small Node.js proxy to securely call Resend.
- Environment Variable: `RESEND_API_KEY`.
- Target: `rmansempire@gmail.com`.

### [Component] src/components/pages/ContactPage.tsx [MODIFY]
- Update `handleSubmit` to perform an `fetch` call to the email endpoint.
- Manage loading and error states during submission.

### [Component] src/components/ui/textarea.tsx [NEW]
- Basic Textarea component to match the `Input` component style.

### [Global] src/locales/es.json & en.json [MODIFY]
- Add `contact` section with all strings from the provided code.

### [Integration] src/App.tsx [MODIFY]
- Import `ContactPage`.
- Update the render logic to include the `contact` case.

## Verification Plan
### Automated Tests
- `npm run build` to ensure no regressions.
### Manual Verification
- Browser check for "Contact" navigation.
- Verify language toggle on the Contact page.
- Verify form success state.
