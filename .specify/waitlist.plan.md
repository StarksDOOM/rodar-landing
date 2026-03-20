# Plan: Waitlist Integration (Mailchimp)

## Objectives
Implement the "Join Waitlist" functionality on the landing page using Mailchimp.

## Proposed Changes

### [Backend/API] api/subscribe.ts [NEW]
- Create a Vercel Serverless Function to interface with Mailchimp.
- Use `@mailchimp/mailchimp_marketing` package.
- Environment Variables: `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, `MAILCHIMP_LIST_ID`.

### [Component] src/components/pages/LandingPage.tsx [MODIFY]
- Update the email subscription logic to call `/api/subscribe`.
- Implement success state rendering using i18n `landing.thankYou`.

## Verification Plan
### Manual Verification
- Test submission on the local dev server (requires mock API or local env).
- Verify audience growth in the Mailchimp dashboard.
