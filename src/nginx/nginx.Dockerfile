# The Owlet gateway. Build context is the repository root.
#
# This image is only the proxy: the Angular bundle is built and served by API.Web
# (see src/API.Web/Dockerfile), and nginx routes to it. The commented-out node build
# stage that used to sit here was a second, never-used way to build the same client.

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY src/nginx/nginx.local.conf /etc/nginx/nginx.conf

# Note: `nginx -t` is deliberately not run here. nginx resolves the host names in an
# `upstream` block when it parses the config, so a config test inside the build — where
# api.web, api.identity, api.basket and api.admin do not exist — fails on DNS rather
# than on syntax. The config is validated by the stack coming up.

EXPOSE 5200
