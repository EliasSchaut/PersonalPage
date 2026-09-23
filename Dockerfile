# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=24

# ---- Build stage --------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# ---- Runtime stage ------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS runtime

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

WORKDIR /app

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs --create-home app

# adapter-node bundles all dependencies, so the build folder is self-contained.
COPY --from=build --chown=app:nodejs /app/build ./build
COPY --from=build --chown=app:nodejs /app/package.json ./package.json

USER app
EXPOSE 3000

CMD ["node", "build"]
