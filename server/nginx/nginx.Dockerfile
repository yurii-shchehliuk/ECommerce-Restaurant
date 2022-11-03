FROM nginx

COPY nginx/nginx.local.conf /etc/nginx/nginx.conf

COPY nginx/id-local.crt /etc/ssl/certs/id-local.owlet.com.crt
COPY nginx/id-local.key /etc/ssl/private/id-local.owlet.com.key
COPY nginx/www-local.crt /etc/ssl/certs/www-local.owlet.com.crt
COPY nginx/www-local.key /etc/ssl/private/www-local.owlet.com.key