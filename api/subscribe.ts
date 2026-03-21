// REMOVED 'dotenv/config' import which causes crashes in production as it's a devDependency.
// Vercel handles environment variables automatically via process.env.
import mailchimp from '@mailchimp/mailchimp_marketing';

/**
 * Simple in-memory rate limiter for local and serverless cold-starts.
 * Note: For high-traffic production, a distributed store like Redis/Upstash is recommended.
 */
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 10; // Max 10 per hour per IP

/**
 * /api/subscribe
 * 
 * Vercel Serverless Function Handler for Mailchimp Waitlist Subscription.
 * Optimized with:
 * - Multi-layer Spam Protection: Honeypot, Timing Check (min 3s), and Rate Limiting.
 * - Security: Custom security headers and Origin verification.
 */
export default async function handler(req: any, res: any) {
  // Add Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none';");

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
                       origin.includes('vercel.app'); 
  
  if (!isAuthorized) {
    console.warn('Security Check Failed for origin:', origin);
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Rate Limiting Logic (Simple IP-based)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const rateLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - rateLimit.lastReset > RATE_LIMIT_WINDOW) {
    rateLimit.count = 0;
    rateLimit.lastReset = now;
  }

  if (rateLimit.count >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  rateLimit.count++;
  rateLimitMap.set(ip, rateLimit);

  const { email, firstName, lastName, middleName, dob, ms } = req.body;

  // 1. Honeypot check: middleName should be empty (bots usually fill it)
  if (middleName) {
    console.warn('Spam detected: Honeypot field filled.');
    return res.status(400).json({ error: 'Spam detected. Request rejected.' });
  }

  // 2. Timing check: Humans usually take more than 3 seconds to fill a form
  if (!ms || ms < 3000) {
    console.warn(`Spam detected: Fast submission (${ms}ms).`);
    return res.status(400).json({ error: 'Submission too fast. Are you a bot?' });
  }

  const trimmedEmail = (email || '').trim();
  const trimmedFirstName = (firstName || '').trim();
  const trimmedLastName = (lastName || '').trim();
  const trimmedDob = (dob || '').trim();

  // Basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  if (trimmedFirstName.length > 50 || trimmedLastName.length > 50) {
    return res.status(400).json({ error: 'Name too long' });
  }

  // Check environment variables
  const apiKey = process.env.MAILCHIMP_API_KEY || process.env.VITE_MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || process.env.VITE_MAILCHIMP_SERVER_PREFIX;
  const listId = process.env.MAILCHIMP_LIST_ID || process.env.VITE_MAILCHIMP_LIST_ID;

  if (!apiKey || !serverPrefix) {
    console.error('MAILCHIMP_CONFIG_ERROR: Missing configuration');
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }

  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  try {
    console.log(`Subscribing ${trimmedEmail} to list ${listId}...`);
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
    console.error('Mailchimp Error Detail:', {
      message: err.message || err,
      status: err.status,
      response: err.response?.body || 'No response body'
    });
    
    if (err.response && err.response.body && err.response.body.title === 'Member Exists') {
      return res.status(200).json({ success: true, message: 'Already subscribed' });
    }

    return res.status(500).json({ error: 'Error subscribing to waitlist. Please try again.' });
  }
}
