import type { Reroute } from '@sveltejs/kit';

/** `/donate` (and `/de/donate`) render the home page with the donate modal open. */
export const reroute: Reroute = ({ url }) => {
  if (url.pathname === '/donate') return '/';
  if (url.pathname === '/de/donate') return '/de';
};
