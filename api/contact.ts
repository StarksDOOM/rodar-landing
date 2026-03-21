// REMOVED 'dotenv/config' import which causes crashes in production.
import { Resend } from 'resend';

/**
 * Vercel Serverless Function Handler for processing contact form submissions.
 * Uses the Resend API to send internal notification emails.
 * 
 * @param req - Incoming Vercel request object (expected POST with name, email, and message).
 * @param res - Outgoing Vercel response object.
 * @returns A JSON response indicating success or a specific error message.
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

  const { name, email, message } = req.body;
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();
  const trimmedMessage = (message || '').trim();

  // Field validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedName || trimmedName.length > 200) {
    return res.status(400).json({ error: 'Valid name is required (max 200 chars)' });
  }
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Valid email address is required' });
  }
  if (!trimmedMessage || trimmedMessage.length > 5000) {
    return res.status(400).json({ error: 'Valid message is required (max 5000 chars)' });
  }

  // Check environment variables
  const resendApiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_CONFIG_ERROR: API Key missing');
    return res.status(500).json({ error: 'Resend configuration is missing in environment.' });
  }

  const resend = new Resend(resendApiKey);

  try {
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Rodar <hola@rodar.do>',
      to: ['rmansempire@gmail.com', 'leo.fulgencio@gmail.com'],
      replyTo: trimmedEmail,
      subject: `Rodar Message from: ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error: error.message || 'Error sending email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
