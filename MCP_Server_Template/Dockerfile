FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install --only=production=false

COPY src ./src
COPY config ./config

RUN npm run build

FROM node:20-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD node dist/healthcheck.cjs || exit 1

CMD ["node", "dist/index.js"]

