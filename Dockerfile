# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Placeholder for next build (.env is not copied into the image)
RUN node scripts/write-runtime-config.mjs --allow-missing

RUN npm run build

# If Cloud Build passes --build-arg NEXT_PUBLIC_API_URL=..., bake it into the image
RUN if [ -n "$NEXT_PUBLIC_API_URL" ]; then node scripts/write-runtime-config.mjs; fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/scripts/write-runtime-config.mjs ./scripts/write-runtime-config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-entrypoint.sh ./docker-entrypoint.sh

# Fix Windows CRLF if present (would break Linux shebang)
RUN sed -i 's/\r$//' ./docker-entrypoint.sh 2>/dev/null || true \
  && chmod +x ./docker-entrypoint.sh

USER nextjs
EXPOSE 8080

ENTRYPOINT ["./docker-entrypoint.sh"]
