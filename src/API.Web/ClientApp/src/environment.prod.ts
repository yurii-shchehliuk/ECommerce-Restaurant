// Swapped in for environment.ts by the `production` configuration in angular.json.
//
// Every URL here is relative, because the production bundle is served through the
// nginx gateway on port 5200 and the gateway routes each prefix to a service:
//
//   /                -> api.web    (this bundle)
//   /identity/...    -> api.identity
//   /basket/...      -> api.basket
//   /admin/...       -> api.admin
//
// Relative URLs mean the browser only ever talks to one origin, which is what makes
// the CORS configuration unnecessary in production rather than merely permissive.
// See src/nginx/nginx.local.conf.
//
// The old version of this file was never used: angular.json pointed its
// fileReplacements at src/environments/environment.ts, a path that does not exist,
// so `ng build --configuration production` failed outright. It also had a flatter
// shape than the code expects (environment.identityApi.api), so it would have thrown
// at runtime if it ever had been used.
export const environment = {
  production: true,
  adminApi: '/admin/api/',
  baseApi: {
    web: '/api/',
    server: '/api/'
  },
  basketApi: '/basket/api/',
  identityApi: {
    api: '/identity/api/',
    chat: '/identity/chatsocket'
  }
};

export const store = {
  product: "product"
};
