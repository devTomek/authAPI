#!/bin/sh
set -e

echo "Waiting for database..."
sleep 3

echo "Running migrations..."
pnpm run migrate:deploy

echo "Generating Prisma client..."
pnpm exec prisma generate

echo "Starting dev server with hot reload..."
exec pnpm dev:server
