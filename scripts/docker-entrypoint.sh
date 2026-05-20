#!/bin/sh
set -e
# Overwrite runtime-config from Cloud Run env (optional if build already baked it in)
if [ -f scripts/write-runtime-config.mjs ]; then
  node scripts/write-runtime-config.mjs || echo "[entrypoint] runtime-config write skipped"
fi
exec node server.js
