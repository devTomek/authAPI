# Auth API

Authentication API built with Express.js, Node.js, and TypeScript

## Prerequisites

- Node.js 24+ (LTS)
- pnpm 8+
- Docker & Docker Compose (optional)

## Configuration

**Note:** Remember to configure environment variables for deployment. If you have questions about the setup, contact tomasz.chybzinski@gmail.com

### Docker (Recommended)

1. Build and run with Docker Compose:

```bash
docker-compose up
```

This will start:

- **API** — http://localhost:3000
- **PostgreSQL** — localhost:5432
- **pgAdmin** — http://localhost:5050

### Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Build TypeScript:

```bash
pnpm build
```

3. Start the development server:

```bash
pnpm dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

- `GET /` - Hello World endpoint
