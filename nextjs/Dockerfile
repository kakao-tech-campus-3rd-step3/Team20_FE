# Multi-stage build for Next.js application
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments
ARG NEXT_PUBLIC_KAKAO_MAP_API_KEY
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG NODE_ENV=production

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_KAKAO_MAP_API_KEY=$NEXT_PUBLIC_KAKAO_MAP_API_KEY
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Build the application with optimizations
RUN npm run build && \
    # 빌드 후 불필요한 파일들 정리
    rm -rf .next/cache/webpack && \
    # 이미지 최적화 캐시 디렉토리 생성
    mkdir -p .next/cache/images

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
