import type {AppConfigInput} from '@imdeepmind/ross';

import {apis} from './app.config/apis.config.ts';
import {applicationConfig} from './app.config/application.config.ts';
import {authenticationConfig} from './app.config/authentication.config.ts';
import {cacheConfig} from './app.config/cache.config.ts';
import {databaseConfig} from './app.config/database.config.ts';
import {docsConfig} from './app.config/docs.config.ts';
import {emailConfig} from './app.config/email.config.ts';
import {models} from './app.config/models.config.ts';

/**
 * Application configuration.
 *
 * Each top-level block lives in `./app.config/`; this file only assembles
 * them into the shape ROSS expects.
 */
export const appConfig: AppConfigInput = {
  application: applicationConfig,
  docs: docsConfig,
  infrastructure: {
    database: databaseConfig,
    cache: cacheConfig,
  },
  authentication: authenticationConfig,
  integrations: {
    email: emailConfig,
  },
  data: {
    models,
  },
  apis,
};
