# syntax=docker/dockerfile:1

# ROSS lives in the sibling repository `rocket/ross`, so it is supplied to the
# build as the additional context named "ross" (see docker-compose.yml).
# Building it here keeps the image in sync with the local path install.

FROM node:24-bookworm AS rossbuild
ENV HUSKY=0
WORKDIR /rocket/ross
COPY --from=ross . .
# The ROSS checkout is trusted and ships native deps (bcrypt, better-sqlite3)
# that need their install scripts to run.
RUN npm ci --dangerously-allow-all-scripts
RUN npm run compile
RUN npm prune --omit=dev

FROM node:24-bookworm AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=rossbuild /rocket/ross/package.json /rocket/ross/package.json
COPY --from=rossbuild /rocket/ross/build /rocket/ross/build
RUN npm ci --ignore-scripts
COPY tsconfig.json ./
COPY src ./src
RUN npm run compile

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
COPY --from=build /app/build ./build

# `npm install file:../rocket/ross` records ross as a symlink. Recreate that
# link and ship ross's compiled output (plus its production dependencies)
# beside it so Node resolves both the package and its imports.
COPY --from=rossbuild /rocket/ross/package.json /rocket/ross/package.json
COPY --from=rossbuild /rocket/ross/build /rocket/ross/build
COPY --from=rossbuild /rocket/ross/node_modules /rocket/ross/node_modules
RUN mkdir -p /app/node_modules/@imdeepmind /app/.migrations \
    && ln -s /rocket/ross /app/node_modules/@imdeepmind/ross \
    && chown node:node /app /app/.migrations

USER node
EXPOSE 3000
CMD ["node", "build/main.js"]
