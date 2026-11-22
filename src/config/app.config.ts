import type {AppConfigInput} from '@imdeepmind/ross';

/**
 * Application configuration.
 *
 * Declares the app metadata, infrastructure connections, the data models the
 * API exposes, and authentication.
 *
 * The `users` model backs username/password authentication. It is the auth
 * user model, so its CRUD routes are disabled by default; users are managed
 * through the generated `/auth` routes instead.
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
  authentication: {
    enabled: true,
    jwtSecret: 'env:JWT_SECRET',
    tokenExpiration: '1d',
    userModel: {
      modelName: 'users',
      idField: 'id',
      providerField: 'provider',
    },
    providers: [
      {
        type: 'up-auth',
        config: {
          fields: {
            usernameField: 'username',
            passwordField: 'password',
            // Registration starts unverified and login rejects unverified
            // users until the emailed OTP is confirmed.
            isVerifiedField: 'verified',
          },
        },
      },
    ],
  },
  integrations: {
    email: {
      provider: 'aws-ses',
      config: {
        region: 'env:AWS_SES_REGION',
        fromEmail: 'env:AWS_SES_FROM_EMAIL',
        accessKeyId: 'env:AWS_ACCESS_KEY_ID',
        secretAccessKey: 'env:AWS_SECRET_ACCESS_KEY',
      },
    },
  },
  data: {
    models: {
      users: {
        // Adds `created_at` / `updated_at` columns maintained by the ORM.
        timestamps: true,
        fields: {
          id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true,
            apis: ['index', 'edit', 'delete'],
          },
          username: {
            type: 'string',
            nullable: false,
            unique: true,
            apis: ['search', 'edit'],
          },
          password: {
            type: 'string',
            nullable: false,
            // Hashes are never returned by the API.
            secret: true,
            apis: ['edit'],
          },
          provider: {
            type: 'string',
            nullable: false,
            default: 'up-auth',
          },
          verified: {
            type: 'boolean',
            nullable: false,
            default: false,
          },
        },
      },
    },
  },
};
