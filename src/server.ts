import type {AppConfigInput} from '@imdeepmind/ross';
import {createServer, defineConfig} from '@imdeepmind/ross';

import type {ServerConfig} from './config/server.config.ts';

/** The running Fastify instance returned by `createServer`. */
export type Server = Awaited<ReturnType<typeof createServer>>['app'];

/**
 * Resolves the configuration and starts the HTTP server.
 *
 * Database migrations are a separate step (see `migrate.ts`).
 *
 * Kept separate from `main.ts` so it can be reused by tests or scripts that
 * need a running server without going through the process entry point.
 */
export async function startServer(
  config: AppConfigInput,
  serverConfig: ServerConfig,
): Promise<Server> {
  // Apply defaults, environment overrides, and validation in one step.
  const resolvedConfig = defineConfig(config);

  const {app} = await createServer(resolvedConfig);

  await app.listen({
    host: serverConfig.host,
    port: serverConfig.port,
  });

  return app;
}
