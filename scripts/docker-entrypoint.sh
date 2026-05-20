#!/bin/sh
set -e
if [ -z "$NEXT_PUBLIC_API_URL" ]; then
  echo "[entrypoint] ERROR: set NEXT_PUBLIC_API_URL on the Cloud Run service (Variables & Secrets)" >&2
  exit 1
fi
if [ -f scripts/write-runtime-config.mjs ]; then
  node scripts/write-runtime-config.mjs
fi
exec node server.js
