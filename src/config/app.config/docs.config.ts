import type {AppConfigInput} from '@imdeepmind/ross';

/** OpenAPI documentation settings. */
export const docsConfig: NonNullable<AppConfigInput['docs']> = {
  openapi: {
    enabled: true,
    path: '/api/docs',
    info: {
      title: 'imdeepmind-backend',
      version: '0.1.0',
    },
  },
};
