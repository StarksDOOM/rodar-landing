// REMOVED 'dotenv/config' import which causes crashes in production as it's a devDependency.
// Vercel handles environment variables automatically via process.env.
import mailchimp from '@mailchimp/mailchimp_marketing';

/**
 * Vercel Serverless Function Handler for Mailchimp Waitlist Subscription.
 * Configures the Mailchimp marketing client and adds a new member to the specified list.
 * 
 * @param req - Incoming Vercel request object (expected POST with email).
 * @param res - Outgoing Vercel response object.
 * @returns A JSON response indicating if the subscription was successful or already exists.
 */
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic security: Check origin/referer
  const origin = req.headers.origin || req.headers.referer || '';
  const isAuthorized = !origin || 
                       origin.includes('rodar.do') || 
                       origin.includes('localhost') || 
                       origin.includes('127.0.0.1') ||
                       origin.includes('vercel.app'); // Allow Vercel preview deployments
  
  if (!isAuthorized) {
    console.warn('Security Check Failed for origin:', origin);
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { email } = req.body;
  const trimmedEmail = (email || '').trim();

  // Basic validation to ensure an email is provided and matches a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  // Debug: Confirm environment variables are present (without leaking them)
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.error('MISSING ENVIRONMENT VARIABLES:', {
      hasApiKey: !!process.env.MAILCHIMP_API_KEY,
      hasServerPrefix: !!process.env.MAILCHIMP_SERVER_PREFIX,
      hasListId: !!process.env.MAILCHIMP_LIST_ID
    });
    return res.status(500).json({ error: 'Mailchimp configuration is missing in environment.' });
  }

  // Configure Mailchimp client using environment variables
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g. "us18"
  });

  try {
    // Attempt to add a new member to the Mailchimp audience
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID || '', {
      email_address: trimmedEmail,
      status: 'subscribed',
    });

    return res.status(200).json({ success: true, data: response });
  } catch (err: any) {
    console.error('Mailchimp Error:', err.message || err);
    
    // Gracefully handle if the member is already subscribed
    if (err.response && err.response.body && err.response.body.title === 'Member Exists') {
      return res.status(200).json({ success: true, message: 'Already subscribed' });
    }

    return res.status(500).json({ error: err.message || 'Error subscribing to waitlist' });
  }
}
