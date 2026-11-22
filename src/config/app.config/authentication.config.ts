import type {AppConfigInput} from '@imdeepmind/ross';

/** JWT authentication backed by the `users` model. */
export const authenticationConfig: NonNullable<
  AppConfigInput['authentication']
> = {
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
};
