# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=24

# ---- Build stage --------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# python3/make/g++ are required to compile better-sqlite3 (native module
# pulled in by @nuxt/content). ca-certificates is needed for HTTPS fetches.
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && corepack enable

WORKDIR /app
COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

RUN pnpm run build

# ---- Runtime stage ------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS runtime

ENV NODE_ENV=production \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=3000

WORKDIR /app

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs --create-home nuxt

# Nitro emits a self-contained bundle, so .output is all we need at runtime.
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output

USER nuxt
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
