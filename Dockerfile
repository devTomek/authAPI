FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache openssl

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

# prisma generate reads prisma.config.ts but never connects to the DB
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build pnpm run build

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

CMD ["docker-entrypoint.sh"]
