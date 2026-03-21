// REMOVED 'dotenv/config' import which causes crashes in production as it's a devDependency.
// Vercel handles environment variables automatically via process.env.
import mailchimp from '@mailchimp/mailchimp_marketing';

/**
 * /api/subscribe
 * 
 * Vercel Serverless Function Handler for Mailchimp Waitlist Subscription.
 * Configures the Mailchimp marketing client and adds a new member to the specified list.
 * Supports both standard MAILCHIMP_* and VITE_MAILCHIMP_* environment variable prefixes
 * to ensure compatibility with various local and production hosting environments.
 * 
 * @param {any} req - Incoming request object.
 * @param {any} res - Outgoing response object.
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

  const { email, firstName, lastName, dob } = req.body;
  const trimmedEmail = (email || '').trim();
  const trimmedFirstName = (firstName || '').trim();
  const trimmedLastName = (lastName || '').trim();
  const trimmedDob = (dob || '').trim();

  // Basic validation to ensure an email is provided and matches a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  // Check environment variables
  const apiKey = process.env.MAILCHIMP_API_KEY || process.env.VITE_MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || process.env.VITE_MAILCHIMP_SERVER_PREFIX;
  const listId = process.env.MAILCHIMP_LIST_ID || process.env.VITE_MAILCHIMP_LIST_ID;

  if (!apiKey || !serverPrefix) {
    console.error('MAILCHIMP_CONFIG_ERROR: Missing configuration');
    return res.status(500).json({ error: 'Mailchimp configuration is missing in environment.' });
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix, // e.g. "us18"
  });

  try {
    // Attempt to add a new member to the Mailchimp audience with merge fields
    const response = await mailchimp.lists.addListMember(listId || '', {
      email_address: trimmedEmail,
      status: 'subscribed',
      merge_fields: {
        FNAME: trimmedFirstName,
        LNAME: trimmedLastName,
        BIRTHDAY: trimmedDob
      }
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
