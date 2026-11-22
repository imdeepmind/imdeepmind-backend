import type {AppConfigInput} from '@imdeepmind/ross';

type CacheConfig = NonNullable<
  NonNullable<AppConfigInput['infrastructure']>['cache']
>;

/** Cache engine. */
export const cacheConfig: CacheConfig = {
  engine: 'memory',
};
