import type {AppConfigInput} from '@imdeepmind/ross';

/**
 * Application configuration.
 *
 * Declares the app metadata, infrastructure connections, and the data models
 * the API exposes. The `notes` model is a simple example with an auto-managed
 * `id` and a searchable `title`.
 */
export const appConfig: AppConfigInput = {
  application: {
    name: 'imdeepmind-backend',
    logLevel: 'info',
    healthCheck: {
      enabled: true,
      path: '/health',
    },
  },
  docs: {
    openapi: {
      enabled: true,
      path: '/api/docs',
      info: {
        title: 'imdeepmind-backend',
        version: '0.1.0',
      },
    },
  },
  infrastructure: {
    database: {
      engine: 'postgres',
      connection: {
        url: 'env:DATABASE_URL',
      },
      timeout: 30000,
    },
    cache: {
      engine: 'memory',
    },
  },
  data: {
    models: {
      notes: {
        // Adds `created_at` / `updated_at` columns maintained by the ORM.
        timestamps: true,
        fields: {
          id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true,
            // `id` is the identifier used by exposed routes.
            apis: ['index', 'edit', 'delete'],
          },
          title: {
            type: 'string',
            nullable: false,
            // `title` is the field users can search.
            apis: ['search'],
          },
          body: {
            type: 'text',
            nullable: true,
          },
        },
      },
    },
  },
};
