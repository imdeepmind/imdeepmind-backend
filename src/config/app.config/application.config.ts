import type {AppConfigInput} from '@imdeepmind/ross';

/** Application metadata, logging, and health check settings. */
export const applicationConfig: NonNullable<AppConfigInput['application']> = {
  name: 'imdeepmind-backend',
  logLevel: 'info',
  healthCheck: {
    enabled: true,
    path: '/health',
  },
  cors: {
    enabled: true,
    origins: ['*'],
  },
};
