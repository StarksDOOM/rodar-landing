import 'dotenv/config';
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

  // Basic security: Check origin/referer (optional but recommended)
  const origin = req.headers.origin || req.headers.referer;
  const isAuthorized = !origin || origin.includes('rodar.do') || origin.includes('localhost') || origin.includes('127.0.0.1');
  
  if (!isAuthorized) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { name, email, message } = req.body;

  // Basic validation for required contact fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Rodar Contact <hola@rodar.do>',
      to: ['rmansempire@gmail.com', 'leo.fulgencio@gmail.com'],
      subject: `Rodar Message from: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
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
