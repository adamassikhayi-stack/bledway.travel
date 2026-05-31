import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = process.env.FROM_ADDRESS || 'BLEDWAY <hello@bledway.travel>';
const NOTIFY_ADDRESS = process.env.NOTIFY_ADDRESS; // optional: founder gets notified too

function renderEmail({ name, country, interest }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<title>BLEDWAY — You're in.</title>
</head>
<body style="margin:0;padding:0;background:#0a0705;">

  <!-- preview text -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">You're on the list. The first Bledway trip is coming.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0705;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#100c08;border:1px solid rgba(196,98,45,0.3);">

          <!-- Top bar -->
          <tr>
            <td style="padding:26px 36px;border-bottom:1px solid rgba(240,230,211,0.1);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td style="font-family:Impact,'Arial Black',sans-serif;font-size:26px;letter-spacing:1px;color:#f0e6d3;">BLED<span style="color:#c4622d;">WAY</span></td>
                <td align="right" style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;color:rgba(240,230,211,0.55);text-transform:uppercase;">Morocco &middot; 2026</td>
              </tr></table>
            </td>
          </tr>

          <!-- Hero band -->
          <tr>
            <td style="background:#1b130c;padding:50px 36px 44px;">
              <div style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:5px;color:#e8a05b;text-transform:uppercase;">You're on the list</div>
              <div style="font-family:Impact,'Arial Black',sans-serif;font-size:54px;line-height:0.9;letter-spacing:0.5px;color:#fbf4e6;text-transform:uppercase;margin-top:14px;">You're in.</div>
              <div style="font-family:Georgia,serif;font-style:italic;font-size:22px;color:#c4622d;margin-top:14px;">Find your bled.</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:38px 36px 10px;">
              <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:17px;line-height:1.7;color:#f0e6d3;">Hey ${escHtml(name)},</p>
              <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:rgba(240,230,211,0.82);">Thanks for signing up. You're officially on the waitlist for the first ever Bledway trip. Small group, real Morocco, the way it was always meant to feel.</p>
              <p style="margin:0 0 26px;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:rgba(240,230,211,0.82);">We'll reach out the moment spots open up. You'll be among the very first to know.</p>
            </td>
          </tr>

          <!-- Detail card -->
          <tr>
            <td style="padding:0 36px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#15100b;border:1px solid rgba(240,230,211,0.1);">
                <tr><td style="padding:20px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#e8a05b;text-transform:uppercase;padding-bottom:4px;">Your details</td>
                    </tr>
                    <tr><td style="font-family:Arial,sans-serif;font-size:15px;color:#f0e6d3;padding:6px 0;border-top:1px solid rgba(240,230,211,0.08);">From &nbsp;<span style="color:rgba(240,230,211,0.6);">${escHtml(country)}</span></td></tr>
                    <tr><td style="font-family:Arial,sans-serif;font-size:15px;color:#f0e6d3;padding:6px 0;border-top:1px solid rgba(240,230,211,0.08);">Dreaming of &nbsp;<span style="color:rgba(240,230,211,0.6);">${escHtml(interest)}</span></td></tr>
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:0 36px 44px;">
              <a href="https://instagram.com/bledway.travel" style="display:inline-block;font-family:Arial,sans-serif;font-weight:600;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#100c08;background:#c4622d;padding:15px 32px;text-decoration:none;">Follow @bledway.travel &rarr;</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:26px 36px;border-top:1px solid rgba(240,230,211,0.1);background:#0a0705;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td style="font-family:Georgia,serif;font-style:italic;font-size:18px;color:#c4622d;">&#x064A;&#x0644;&#x0627;. Let's go.</td>
                <td align="right" style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;color:rgba(240,230,211,0.4);text-transform:uppercase;">@bledway.travel<br/>Brussels &middot; Belgium</td>
              </tr></table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, country, interest, 'bot-field': honeypot } = body;

  // Silently drop bot submissions
  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate required fields
  if (!name || !email || !country || !interest) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ ok: false, error: 'Email service not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Send confirmation to the subscriber
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "You're in. Welcome to Bledway 🇲🇦",
      html: renderEmail({ name, country, interest }),
    });

    // Optionally notify the founder
    if (NOTIFY_ADDRESS) {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: NOTIFY_ADDRESS,
        subject: `New waitlist signup: ${name}`,
        html: `<p style="font-family:sans-serif;color:#333;">
          <strong>${escHtml(name)}</strong> (${escHtml(email)}) just signed up.<br/>
          Country: ${escHtml(country)}<br/>
          Interest: ${escHtml(interest)}
        </p>`,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Resend error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/subscribe' };
