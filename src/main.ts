import {appConfig} from './config/app.config.ts';
import {loadServerConfig} from './config/server.config.ts';
import {startServer} from './server.ts';

/**
 * Process entry point.
 *
 * Everything concrete lives in `config/` and `server.ts`; this file only wires
 * them together and handles shutdown.
 */
const app = await startServer(appConfig, loadServerConfig());

// Close the server cleanly so in-flight requests and DB connections can finish.
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void app.close().then(() => process.exit(0));
  });
}
