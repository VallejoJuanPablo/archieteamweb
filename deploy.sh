#!/bin/bash
set -e

echo "=== Deploying ArchieTeam ==="

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo ">>> Pulling latest code..."
git pull origin master

echo ">>> Building and restarting container..."
docker compose -f docker-compose.prod.yml up -d --build

echo ">>> Waiting for startup..."
sleep 3

echo ">>> Container status:"
docker compose -f docker-compose.prod.yml ps

echo ">>> Health check..."
curl -sf http://localhost:80 > /dev/null && echo "OK" || echo "WARN: health check failed"

echo ""
echo "=== Deploy complete ==="
