# Auth API

CRUD and Authentication API in Service-Controller Architecture, built with Express.js, Node.js, TypeScript, Prisma, Docker and pgAdmin.

## Prerequisites

- Node.js 24+ (LTS)
- pnpm 8+
- Docker & Docker Compose

### Docker Development (hot reload)

Start the full stack with file watching. Code changes in `src/` restart the API automatically:

```bash
pnpm dev
```

This starts:

- **API** - http://localhost:3000 (tsx watch, source mounted)
- **PostgreSQL** - localhost:5432
- **pgAdmin** - http://localhost:5050

Rebuild the dev image only when `package.json` or `pnpm-lock.yaml` changes. If dependencies change and the container still sees old packages, recreate the `node_modules` volume:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
pnpm dev
```

### Docker Production

Build and run the production image (compiled TypeScript, no hot reload):

```bash
docker compose up --build
```

## API Endpoints

- `GET /` - Healthcheck
- `POST /auth/login` - Login and receive a JWT access token
- `GET /users` - Get all users
- `POST /users` - Create a user
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user
