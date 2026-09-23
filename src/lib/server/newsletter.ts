import { env } from '$env/dynamic/private';
import type { Locale } from '$lib/i18n';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) hits.clear(); // crude memory guard
  return recent.length > MAX_PER_WINDOW;
}

export type SubscribeResult = 'ok' | 'rate_limited' | 'error';

/**
 * Subscribe an address to the Listmonk list of the given locale.
 * Listmonk handles double opt-in and sends the confirmation mail.
 */
export async function subscribe({
  email,
  locale,
  ip,
}: {
  email: string;
  locale: Locale;
  ip: string;
}): Promise<SubscribeResult> {
  if (rateLimited(ip)) return 'rate_limited';
  const base = env.LISTMONK_URL;
  const list = locale === 'de' ? env.LISTMONK_LIST_DE : env.LISTMONK_LIST_EN;
  if (!base || !list) {
    console.error('newsletter: LISTMONK_URL / LISTMONK_LIST_* not configured');
    return 'error';
  }
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/public/subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, list_uuids: [list] }),
    });
    if (!res.ok) {
      console.error('newsletter: listmonk responded', res.status, await res.text());
      return 'error';
    }
    return 'ok';
  } catch (err) {
    console.error('newsletter: request failed', err);
    return 'error';
  }
}
