import {defineConfig, migrateDatabase} from '@imdeepmind/ross';

import {appConfig} from './config/app.config.ts';

/**
 * Applies the configured schema to the database and exits.
 *
 * Run this before starting the server, or as a separate deployment step, so
 * server startup does not depend on database access.
 */
await migrateDatabase(defineConfig(appConfig));
