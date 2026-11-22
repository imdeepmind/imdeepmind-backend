#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Create a local .env on first run, then export everything so both Docker
# Compose and the locally-run API see the same values.
if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

set -a; source .env; set +a

require_docker() {
  if ! docker info >/dev/null 2>&1; then
    echo "Docker is not running. Start Docker Desktop and try again." >&2
    exit 1
  fi
}

case "${1:-help}" in
  dev|up)
    require_docker
    docker compose up --build
    ;;
  local)
    # Postgres in Docker, API with tsx watch on the host.
    require_docker
    docker compose up -d db
    npm run dev
    ;;
  db)
    require_docker
    docker compose up -d db
    ;;
  migrate)
    npm run migrate
    ;;
  down)
    require_docker
    docker compose down
    ;;
  logs)
    require_docker
    docker compose logs -f api
    ;;
  sh)
    require_docker
    docker compose exec api sh
    ;;
  check)
    npm run compile && npm run lint
    ;;
  lint)
    npm run lint
    ;;
  fix|format)
    npm run fix
    ;;
  test)
    npm run test
    ;;
  *)
    echo "Usage: ./dev.sh <operation>"
    echo ""
    echo "Operations:"
    echo "  dev       Build and run the full stack in Docker (api + Postgres)"
    echo "  local     Start Postgres in Docker and run the API with tsx watch"
    echo "  db        Start the Postgres container only"
    echo "  migrate   Apply the database schema"
    echo "  down      Stop and remove the containers"
    echo "  logs      Follow the api container logs"
    echo "  sh        Open a shell in the api container"
    echo "  check     Compile and lint"
    echo "  lint      Lint with gts"
    echo "  fix       Auto-fix lint and formatting with gts"
    echo "  test      Run the test script"
    exit 1
    ;;
esac
