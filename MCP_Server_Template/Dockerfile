FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install --only=production=false

COPY src ./src
COPY config ./config

RUN npm run build

FROM node:20-alpine AS runtime

# OCI / GHCR metadata (override via build-arg when publishing)
ARG IMAGE_VERSION=dev
ARG IMAGE_SOURCE=""
ARG IMAGE_REVISION=""
ARG IMAGE_VENDOR=""
ARG IMAGE_TITLE="MCP Server - Template"
ARG IMAGE_DESCRIPTION="TypeScript MCP server template with health endpoints."

LABEL org.opencontainers.image.version="${IMAGE_VERSION}" \
      org.opencontainers.image.source="${IMAGE_SOURCE}" \
      org.opencontainers.image.revision="${IMAGE_REVISION}" \
      org.opencontainers.image.vendor="${IMAGE_VENDOR}" \
      org.opencontainers.image.title="${IMAGE_TITLE}" \
      org.opencontainers.image.description="${IMAGE_DESCRIPTION}"

ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD node dist/healthcheck.cjs || exit 1

CMD ["node", "dist/index.js"]

