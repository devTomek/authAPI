#!/bin/sh
set -e
echo "Waiting for database to be ready..."
sleep 5
echo "Database should be ready now..."
echo "Running migrations..."
pnpm run migrate:deploy

echo "Starting server..."
pnpm start
