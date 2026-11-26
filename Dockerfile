# syntax=docker/dockerfile:1

FROM node:24-bookworm AS build
ENV npm_config_allow_git=all
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
COPY src ./src
RUN npm ci
RUN npm prune --omit=dev

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
RUN mkdir -p /app/.migrations && chown node:node /app /app/.migrations

USER node
EXPOSE 3000
CMD ["node", "build/main.js"]
