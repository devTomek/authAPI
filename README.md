# Auth API

Authentication API built with Express.js, Node.js, and TypeScript

## Prerequisites

- Node.js 26+
- pnpm 8+
- Docker & Docker Compose (optional)

## Installation

### Docker

Build and run with Docker Compose:

```bash
docker-compose up
```

Or build and run manually:

```bash
docker build -t auth-api .
docker run -p 3000:3000 auth-api
```

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

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
