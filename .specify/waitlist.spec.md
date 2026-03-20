# Specification: Waitlist Integration (Mailchimp)

The Waitlist feature allows users to join the Rodar mailing list directly from the landing page. It integrates with Mailchimp via a secure Vercel Serverless Function.

## Requirements
- **Integration**: Use the Mailchimp Marketing API to add subscribers to a specific list.
- **UX**:
  - Show a loading state during submission.
  - Show the `thankYou` message from i18n upon success.
  - Handle errors gracefully.
- **Security**: The Mailchimp API Key and List ID must be stored in Vercel environment variables, never exposed to the client.

## Acceptance Criteria
- [ ] Submitting an email on the Landing Page adds the user to the Mailchimp list.
- [ ] The "JOIN" button changes to a success message.
- [ ] No API keys are visible in the browser network tab.
