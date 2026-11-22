/** Network settings used when the HTTP server starts listening. */
export interface ServerConfig {
  host: string;
  port: number;
}

/**
 * Reads server settings from the environment, falling back to local defaults.
 *
 * Environment variables are read here (rather than deep in the bootstrap code)
 * so the rest of the app can receive a plain, already-validated config object.
 */
export function loadServerConfig(): ServerConfig {
  const port = Number(process.env.PORT ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`Invalid PORT value: ${process.env.PORT}`);
  }

  return {
    host: process.env.HOST ?? '0.0.0.0',
    port,
  };
}
