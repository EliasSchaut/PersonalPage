# Personal Website

My personal website about me and my projects – [schaut.dev](https://schaut.dev).

Built with [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5), Tailwind CSS 4 and plain Markdown
content edited through [Sveltia CMS](https://github.com/sveltia/sveltia-cms).

## Setup

1. Install [Node.js](https://nodejs.org) 24 and enable pnpm via `corepack enable`.
2. `pnpm install`
3. `cp .env.example .env` and fill in what you need (SMTP for the contact form, GitHub OAuth for
   the CMS, Listmonk for the newsletter). Everything is optional for local development. For the
   contact form without a real mailbox run `pnpm dev:services` ([MailDev](https://github.com/maildev/maildev),
   `docker-compose.dev.yml`) and point `SMTP_HOST`/`SMTP_PORT` at `127.0.0.1:1025`; mails show up at
   <http://localhost:1080>.
4. `pnpm dev` – open <http://localhost:5173>.

## Scripts

| Command             | Purpose                                                 |
| ------------------- | ------------------------------------------------------- |
| `pnpm dev`          | Dev server with HMR                                     |
| `pnpm dev:services` | MailDev via `docker-compose.dev.yml` (`:down` stops it) |
| `pnpm build`        | Production build to `build/` (adapter-node)             |
| `pnpm start`        | Run the production build (`node build`)                 |
| `pnpm check`        | svelte-check / TypeScript                               |
| `pnpm lint`         | Prettier + ESLint                                       |
| `pnpm test`         | Vitest unit tests (markdown pipeline, content, i18n)    |
| `pnpm test:e2e`     | Playwright smoke tests (builds + previews the app)      |
| `pnpm format`       | Prettier write                                          |

## Content & CMS

- Articles live in `content/articles/<locale>/<slug>.md` (`en`, `de`), pages in
  `content/<name>.<locale>.md`. Frontmatter: `title`, `description`, `cover`, `date`
  (`YYYY-MM-DD`), `published`, `tags`.
- Images/PDFs go to `static/articles/` and are referenced as `/articles/<file>`; covers to
  `static/articles/covers/`.
- Content is rendered at build time (unified/remark/rehype). Inline HTML such as `<mark>` and
  `<br>` is allowed.
- **Editing in the browser:** open `https://schaut.dev/admin/` and sign in with GitHub. Sveltia
  commits straight to `main`; content is baked in at build time, so the image has to be rebuilt
  and redeployed after content changes.
  - Requires a GitHub OAuth App with callback `https://schaut.dev/api/oauth/callback` and the
    `GITHUB_OAUTH_*` / `CMS_ALLOWED_ORIGINS` env vars.
  - Locally, open <http://localhost:5173/admin/> in Chromium and choose “Work with Local
    Repository” (no OAuth needed).

## URLs & i18n

English is the default (`/articles/bday24`), German is prefixed (`/de/articles/bday24`). The
language switch stores the choice in the `i18n_redirected` cookie; only the bare `/` redirects
German visitors to `/de`. Every page emits `hreflang`, canonical and Open Graph tags; RSS feeds
are at `/rss.xml` and `/de/rss.xml`, the sitemap at `/sitemap.xml`.

## Newsletter

Subscriptions go to a self-hosted [Listmonk](https://listmonk.app) (own stack in `docker-compose.listmonk.yml`,
`LISTMONK_*` env vars) with double opt-in. The GitHub Action in
`.github/workflows/newsletter.yml` creates and sends a campaign whenever a new published article
is committed (see `scripts/notify-newsletter.mjs`).

## Deployment

CI builds the image on every push to `main`, pushes it to Docker Hub as
`kidilias/personalpage:latest` (plus `sha-<short>`), and then POSTs to a deploy webhook so the
server pulls the new image. Required GitHub settings:

| Kind     | Name                    | Purpose                                              |
| -------- | ----------------------- | ---------------------------------------------------- |
| variable | `DOCKERHUB_USERNAME`    | Docker Hub account                                   |
| secret   | `DOCKERHUB_TOKEN`       | Docker Hub access token (read/write)                 |
| variable | `DEPLOY_WEBHOOK_URL`    | Endpoint the server exposes; skipped when unset      |
| secret   | `DEPLOY_WEBHOOK_SECRET` | Sent as `Authorization: Bearer …` and as HMAC-SHA256 |

The webhook receives `{"image","tag","sha","digest","ref"}` with headers
`Authorization: Bearer <secret>` and `X-Signature-256: sha256=<hmac of body>`; verify one of
them, then run `docker compose pull && docker compose up -d` in the deployed checkout. Local
builds still work with `docker compose build` (the `Dockerfile` is unchanged); `.env` provides
`PORT`, `HOST`, `ORIGIN` and the app secrets.
