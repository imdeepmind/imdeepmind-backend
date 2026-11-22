import type {AppConfigInput} from '@imdeepmind/ross';

type DatabaseConfig = NonNullable<
  NonNullable<AppConfigInput['infrastructure']>['database']
>;

/** Database engine and connection. */
export const databaseConfig: DatabaseConfig = {
  engine: 'postgres',
  connection: {
    url: 'env:DATABASE_URL',
  },
  timeout: 30000,
};
