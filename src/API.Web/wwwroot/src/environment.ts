// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  adminApi: 'http://localhost:5011/api/',
  baseApi: 'http://localhost:5021/api/',
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
