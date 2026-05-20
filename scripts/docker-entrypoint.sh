#!/bin/sh
set -e
if [ -f scripts/write-runtime-config.mjs ]; then
  node scripts/write-runtime-config.mjs
fi
exec node server.js
