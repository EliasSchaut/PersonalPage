import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

import { STATE_COOKIE } from '$lib/server/oauth';

/**
 * Step 1 of the Sveltia CMS GitHub OAuth flow: redirect the popup to GitHub.
 * Sveltia opens `${base_url}/${auth_endpoint}?provider=github&site_id=...&scope=...`.
 */
export const GET: RequestHandler = ({ url, cookies }) => {
  if (url.searchParams.get('provider') !== 'github') error(400, 'Unsupported provider');
  if (!env.GITHUB_OAUTH_CLIENT_ID) error(500, 'GITHUB_OAUTH_CLIENT_ID is not configured');

  const state = crypto.randomUUID();
  cookies.set(STATE_COOKIE, state, {
    path: '/api/oauth',
    httpOnly: true,
    secure: url.protocol === 'https:',
    sameSite: 'lax',
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: env.GITHUB_OAUTH_CLIENT_ID,
    redirect_uri: `${url.origin}/api/oauth/callback`,
    // The repo is public; `repo` would be needed for a private repository.
    scope: env.GITHUB_OAUTH_SCOPE ?? 'public_repo',
    state,
  });
  redirect(302, `https://github.com/login/oauth/authorize?${params}`);
};
