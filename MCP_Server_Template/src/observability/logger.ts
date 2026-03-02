import pino, { LoggerOptions } from "pino";
import type { FastifyBaseLogger } from "fastify";

export type AppLogger = FastifyBaseLogger;

export function createLogger(): AppLogger {
  const level = (process.env.LOG_LEVEL ?? "info").toLowerCase();

  const options: LoggerOptions = {
    level,
    base: undefined,
    transport:
      process.env.NODE_ENV === "production"
        ? undefined
        : {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:standard",
            },
          },
  };

  return pino(options) as unknown as AppLogger;
}

