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

| Endpoint   | URL                                       |
| ---------- | ----------------------------------------- |
| Health     | `http://localhost:3000/health`            |
| Swagger UI | `http://localhost:3000/api/docs`          |
| Auth API   | `http://localhost:3000/api/v1/auth/login` |

## Authentication

The API uses username/password authentication (`up-auth`). Users are stored in
the `users` table with a bcrypt-hashed password and a `verified` flag.

| Method   | Path                               | Description                  |
| -------- | ---------------------------------- | ---------------------------- |
| `POST`   | `/api/v1/auth/register`            | Create an account            |
| `POST`   | `/api/v1/auth/register/verify/otp` | Confirm the registration OTP |
| `POST`   | `/api/v1/auth/login`               | Log in and receive a JWT     |
| `GET`    | `/api/v1/auth/user/me`             | Read the current profile     |
| `PATCH`  | `/api/v1/auth/user/me`             | Update the current profile   |
| `DELETE` | `/api/v1/auth/user/me`             | Delete the current profile   |

Registration sends an OTP through the configured email integration. Locally the
`dummy` provider prints the code to the server logs, so no real email is sent.
Because the `verified` flag is configured as the verification field, login is
rejected until the OTP is confirmed.

## TODO API

The TODO app's storage is backed by four tables: `todo_folders`, `todo_todos`,
`todo_tags`, and `todo_todo_tags`. Every route requires the bearer JWT, and the
owner is injected server-side with `[[userId]]`, so clients never send
`user_id`.

| Method   | Path                                             | Description                            |
| -------- | ------------------------------------------------ | -------------------------------------- |
| `POST`   | `/api/v1/todo_folders/`                          | Create a folder                        |
| `GET`    | `/api/v1/todo_folders/`                          | List the current user's folders        |
| `POST`   | `/api/v1/todo_todos/`                            | Create a task                          |
| `GET`    | `/api/v1/todo_todos/`                            | List tasks (`folder_id_eq`, `orderBy`) |
| `PATCH`  | `/api/v1/todo_todos/user_id/:user_id?id_eq=<id>` | Update or toggle a task                |
| `DELETE` | `/api/v1/todo_todos/id/:id`                      | Delete a task                          |
| `DELETE` | `/api/v1/todo_todos/folder_id/:folder_id`        | Clear all tasks in a folder            |
| `DELETE` | `/api/v1/todo_folders/id/:id`                    | Delete a non-default folder            |

Notes:

- The client creates the default `Inbox` folder (`is_default: true`) when its
  folder list is empty.
- `POST` responses return the submitted fields but not the generated `id`; read
  the id from the following `GET`.
- `PATCH` targets the `user_id` path segment so the ownership filter applies;
  the segment is overwritten by `[[userId]]`, so its value does not matter.
- Deletes return `204` even when no row matched, preventing cross-user
  existence leaks. Move a folder's tasks to `Inbox` before deleting the folder.

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

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Run with `tsx` watch mode                 |
| `npm run migrate` | Apply the database schema and exit        |
| `npm run compile` | Type-check and emit to `build/`           |
| `npm start`       | Run the compiled server (`build/main.js`) |
| `npm run lint`    | Lint with gts                             |
| `npm run fix`     | Auto-fix lint and formatting with gts     |

## Configuration

Configuration lives in [`src/config/app.config.ts`](src/config/app.config.ts),
which assembles the blocks in [`src/config/app.config/`](src/config/app.config) (application,
docs, database, cache, authentication, email, models, and APIs) into the
`AppConfigInput` shape from ROSS. The database URL is read from
`DATABASE_URL`, the JWT signing secret from `JWT_SECRET` (at least 32
characters), and host/port from `HOST`/`PORT` (see
`src/config/server.config.ts`).
