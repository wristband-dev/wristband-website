/**
 * Cloudflare Pages Function — replaces Webflow Forms for /request-demo.
 *
 * Configure secrets in the Cloudflare Pages project:
 *   DEMO_FORM_WEBHOOK_URL  — optional Zapier/Make/Slack webhook
 *   DEMO_FORM_TO_EMAIL     — optional destination note (for logging)
 *
 * Without a webhook, submissions are accepted and logged so staging works;
 * wire DEMO_FORM_WEBHOOK_URL before production cutover.
 */

interface Env {
  DEMO_FORM_WEBHOOK_URL?: string;
  DEMO_FORM_TO_EMAIL?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
  };

  try {
    const contentType = context.request.headers.get('content-type') || '';
    let email = '';

    if (contentType.includes('application/json')) {
      const body = (await context.request.json()) as { email?: string };
      email = (body.email || '').trim();
    } else {
      const form = await context.request.formData();
      email = String(form.get('email') || '').trim();
    }

    if (!EMAIL_RE.test(email)) {
      return Response.json(
        { ok: false, error: 'Invalid email' },
        { status: 400, headers: cors },
      );
    }

    const payload = {
      email,
      source: 'wristband.dev/request-demo',
      submittedAt: new Date().toISOString(),
      to: context.env.DEMO_FORM_TO_EMAIL || 'info@wristband.dev',
    };

    if (context.env.DEMO_FORM_WEBHOOK_URL) {
      const webhookRes = await fetch(context.env.DEMO_FORM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!webhookRes.ok) {
        console.error('Demo form webhook failed', webhookRes.status);
        return Response.json(
          { ok: false, error: 'Delivery failed' },
          { status: 502, headers: cors },
        );
      }
    } else {
      console.log('Demo form submission (no webhook configured)', payload);
    }

    return Response.json({ ok: true }, { headers: cors });
  } catch (err) {
    console.error(err);
    return Response.json(
      { ok: false, error: 'Server error' },
      { status: 500, headers: cors },
    );
  }
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
