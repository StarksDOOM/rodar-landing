import mailchimp from '@mailchimp/mailchimp_marketing';

// Vercel Serverless Function Handler for Mailchimp Subscription
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Basic validation
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g. "us18"
  });

  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID || '', {
      email_address: email,
      status: 'subscribed',
    });

    return res.status(200).json({ success: true, data: response });
  } catch (err: any) {
    console.error('Mailchimp Error:', err);
    
    // Check if the member is already subscribed
    if (err.response && err.response.body && err.response.body.title === 'Member Exists') {
      return res.status(200).json({ success: true, message: 'Already subscribed' });
    }

    return res.status(500).json({ error: err.message || 'Error subscribing to waitlist' });
  }
}
