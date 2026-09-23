import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { STATE_COOKIE } from '$lib/server/oauth';

const PROVIDER = 'github';

function allowedOrigins(requestOrigin: string): string[] {
  const configured = (env.CMS_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return configured.length ? configured : [requestOrigin];
}

/**
 * Step 2: exchange the code for a token and hand it to the CMS via the
 * Decap/Sveltia postMessage handshake.
 */
function page(payload: { token?: string; error?: string }, origins: string[]): Response {
  const status = payload.token ? 'success' : 'error';
  const data = payload.token
    ? { provider: PROVIDER, token: payload.token }
    : { provider: PROVIDER, error: payload.error ?? 'Unknown error' };
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorizing…</title></head>
<body><p>Authorizing with GitHub… you can close this window if it does not close automatically.</p>
<script>
  (function () {
    var provider = ${JSON.stringify(PROVIDER)};
    var allowed = ${JSON.stringify(origins)};
    var message = 'authorization:' + provider + ':${status}:' + ${JSON.stringify(JSON.stringify(data))};
    function receive(e) {
      if (e.data !== 'authorizing:' + provider) return;
      if (allowed.indexOf(e.origin) === -1) return;
      window.removeEventListener('message', receive);
      window.opener.postMessage(message, e.origin);
      window.close();
    }
    window.addEventListener('message', receive);
    if (window.opener) window.opener.postMessage('authorizing:' + provider, '*');
  })();
</script></body></html>`;
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
    },
  });
}

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
  const origins = allowedOrigins(url.origin);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expected = cookies.get(STATE_COOKIE);
  cookies.delete(STATE_COOKIE, { path: '/api/oauth' });

  if (!code || !state || !expected || state !== expected) {
    return page({ error: 'Invalid OAuth state' }, origins);
  }
  if (!env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET) {
    return page({ error: 'OAuth is not configured on the server' }, origins);
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/api/oauth/callback`,
      }),
    });
    const body = (await res.json()) as { access_token?: string; error_description?: string };
    if (!res.ok || !body.access_token) {
      return page({ error: body.error_description ?? 'Token exchange failed' }, origins);
    }
    return page({ token: body.access_token }, origins);
  } catch (err) {
    console.error('oauth callback failed', err);
    return page({ error: 'Token exchange failed' }, origins);
  }
};
