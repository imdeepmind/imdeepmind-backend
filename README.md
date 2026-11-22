# imdeepmind-backend

Backend API for all my personal projects, built with
[ROSS](https://github.com/imdeepmind/rocket) (Fastify) and PostgreSQL.

## Prerequisites

- Node.js 24+
- Docker (for PostgreSQL and the containerized app)
- The ROSS source checkout at `../rocket/ross` — it is installed as a local
  path dependency because it is not published to npm.

## Install

```bash
npm install
```

`@imdeepmind/ross` is installed from `../rocket/ross` via `file:` in
`package.json`, so changes in that checkout are picked up directly.

## Local development

Start PostgreSQL (exposed on host port `5433`):

```bash
cp .env.example .env
docker compose up -d db
```

Apply the schema, then run the API with hot reload:

```bash
npm run migrate
npm run dev
```

The server listens on `http://localhost:3000`. Migrations are a separate step
(`src/migrate.ts`), so starting the server does not touch the database schema.

| Endpoint   | URL                                 |
| ---------- | ----------------------------------- |
| Health     | `http://localhost:3000/health`      |
| Swagger UI | `http://localhost:3000/api/docs`    |
| Notes API  | `http://localhost:3000/api/v1/notes` |

## Run everything in Docker

```bash
docker compose up --build
```

This builds the app image (compiling ROSS from the sibling checkout), starts
PostgreSQL, and runs a one-shot `migrate` service before the `api` container.
The `api` container talks to Postgres over the compose network; the database is
also reachable from the host on port `5433`.

> The compose file uses `build.additional_contexts` to pass `../rocket/ross`
> into the build, which requires Docker Compose v2.17+.

## dev.sh

`./dev.sh` wraps the common workflows and loads `.env` (creating it from
`.env.example` on first run):

```bash
./dev.sh dev      # build + run api and Postgres in Docker
./dev.sh local    # Postgres in Docker, API with tsx watch
./dev.sh migrate  # apply the database schema
./dev.sh check    # compile + lint
./dev.sh fix      # auto-fix lint and formatting
```

Run `./dev.sh` with no arguments for the full list.

## Scripts

| Command             | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Run with `tsx` watch mode                   |
| `npm run migrate`   | Apply the database schema and exit          |
| `npm run compile`   | Type-check and emit to `build/`             |
| `npm start`         | Run the compiled server (`build/main.js`)   |
| `npm run lint`      | Lint with gts                               |
| `npm run fix`       | Auto-fix lint and formatting with gts       |

## Configuration

Configuration lives in [`src/config/app.config.ts`](src/config/app.config.ts)
and is typed with `AppConfigInput` from ROSS. The database URL is read from
`DATABASE_URL`; host/port come from `HOST`/`PORT` (see
`src/config/server.config.ts`).
