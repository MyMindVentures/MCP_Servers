# Build stage: install deps and build UI
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY . .

# Build docs UI so it is served at runtime
RUN cd ui && if [ -f package-lock.json ]; then npm ci; else npm install; fi && npm run build

# -----------------------------------------------------------------------------
# Production stage: minimal image with only runtime needs
# -----------------------------------------------------------------------------
FROM node:22-alpine AS runner

# OCI / GHCR metadata (override via build-arg when publishing)
ARG IMAGE_VERSION=dev
ARG IMAGE_SOURCE=""
ARG IMAGE_REVISION=""
ARG IMAGE_VENDOR=""
ARG IMAGE_TITLE="MCP Server - Gamma AI"
ARG IMAGE_DESCRIPTION="MCP server with Gamma API tools; Docs UI and streamable HTTP."

LABEL org.opencontainers.image.version="${IMAGE_VERSION}" \
      org.opencontainers.image.source="${IMAGE_SOURCE}" \
      org.opencontainers.image.revision="${IMAGE_REVISION}" \
      org.opencontainers.image.vendor="${IMAGE_VENDOR}" \
      org.opencontainers.image.title="${IMAGE_TITLE}" \
      org.opencontainers.image.description="${IMAGE_DESCRIPTION}"

# Non-root user for running the server
RUN addgroup -g 1001 -S mcp && adduser -u 1001 -S mcp -G mcp

# Data dir for auth-data.json and tool-settings (volume mount); must be writable by mcp
RUN mkdir -p /app/data && chown -R mcp:mcp /app/data

WORKDIR /app

# Copy app and built UI from builder (no devDependencies)
COPY --from=builder --chown=mcp:mcp /app/package.json /app/
COPY --from=builder --chown=mcp:mcp /app/node_modules /app/node_modules
COPY --from=builder --chown=mcp:mcp /app/lib /app/lib
COPY --from=builder --chown=mcp:mcp /app/tools /app/tools
COPY --from=builder --chown=mcp:mcp /app/mcpServer.js /app/
COPY --from=builder --chown=mcp:mcp /app/ui/dist /app/ui/dist

USER mcp

EXPOSE 3001

# Default port; override with PORT env var
ENTRYPOINT ["node", "mcpServer.js", "--streamable-http"]
