// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /** Stripe publishable test key. Publishable keys are safe in a client bundle;
   *  the secret key lives only in API.Basket's configuration. */
  stripePublishableKey:
    'pk_test_51KoUd9JYz8ovjrojZ0XrlL1jcNHH2uHULciK9nXWbrBGeBRT7NovFO5a38ncqfEg9NKBiG8OPfaKFWKcm9Pr7OqZ00pYxWvWx4',
  adminApi: 'http://localhost:5011/api/',
  baseApi: {
    web: 'http://localhost:5021/api/',
    server: 'http://localhost:52766/api/'
  },
  basketApi: 'http://localhost:5031/api/',
  identityApi: {
    api: 'http://localhost:5041/api/',
    chat: 'http://localhost:5041/chatsocket'
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
