import type {AppConfigInput} from '@imdeepmind/ross';

type EmailConfig = NonNullable<
  NonNullable<AppConfigInput['integrations']>['email']
>;

/** Outbound email integration used for OTPs. */
export const emailConfig: EmailConfig = {
  provider: 'aws-ses',
  config: {
    region: 'env:AWS_SES_REGION',
    fromEmail: 'env:AWS_SES_FROM_EMAIL',
    accessKeyId: 'env:AWS_ACCESS_KEY_ID',
    secretAccessKey: 'env:AWS_SECRET_ACCESS_KEY',
  },
};
