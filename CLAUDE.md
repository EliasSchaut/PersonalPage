# CLAUDE.md

Personal website schaut.dev — SvelteKit (Svelte 5, runes), Tailwind 4, adapter-node, pnpm.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start` (`node build`); `pnpm dev:services` starts MailDev (`docker-compose.dev.yml`) for the contact form.
- `pnpm check` (svelte-check), `pnpm lint` (prettier + eslint), `pnpm format`
- `pnpm test` (vitest), `pnpm test:e2e` (playwright, builds + previews on :4173)
- Run `pnpm lint && pnpm check && pnpm test` before committing.

## Layout

- `src/routes/[[lang=lang]]/…` — all pages; `lang` matches only `de`. EN has no prefix, DE is `/de/…`.
- `src/hooks.server.ts` — locale + theme from URL/cookies, sets `locals.locale`/`locals.theme`.
- `src/lib/i18n/` — `en.json`/`de.json` (keys must stay in sync, tested), `getI18n()` context (`t`, `path`, `formatDate`).
- `src/lib/server/content/` — markdown pipeline (gray-matter → zod → remark/rehype), loaded at build time via `import.meta.glob`. Server-only.
- `src/lib/components/` — UI; icons via `~icons/heroicons/*` and `~icons/simple-icons/*` (unplugin-icons).
- `src/lib/data/` — static lists (tools, projects, work, socials, donate).
- Legal (imprint + privacy) lives on one page: `/legal`; `/imprint` and `/privacy` redirect there.
- `content/articles/<en|de>/<slug>.md` — same slugs in both locales. Frontmatter: `title, description, cover (/articles/covers/x.png), date (YYYY-MM-DD), published, tags`.
- `static/admin/` — Sveltia CMS (`config.yml`); OAuth endpoints in `src/routes/api/oauth/`.
- Env via `$env/dynamic/private` only (see `.env.example`); never `$env/static`.

## Conventions

- Build hrefs with `i18n.path('/x')`, never hardcode `/de`.
- Inline HTML in markdown is allowed (`<mark>`, `<br>`); no MDC syntax.
- Never hold locale/theme in module-level `$state` (SSR leak) — use the context from `+layout.svelte`.
- Prettier: 2 spaces, single quotes, trailing commas, width 100.
- Deploy: Docker image from `docker-compose.yml`, rebuilt after pushes to `main` (content is baked in at build time, so `/admin` commits need a rebuild). Listmonk runs as a separate stack (`docker-compose.listmonk.yml`).
