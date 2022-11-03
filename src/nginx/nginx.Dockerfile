##base image
#FROM node:14.15.5 as build
#
##set working directory
#WORKDIR /app
#
##add `/app/node_modules/.bin` to PATH
#ENV PATH /app/node_modules/.bin:$PATH
#
##install cache and dependencies
##COPY ["./package.json", "/app/package.json"]
#COPY server/API.Base/wwwroot/package.json /app/package.json
#RUN npm install
#
##add app
#COPY . /app
#
##generate build #development|production
#ARG configuration=production
##RUN ng build --output-path=dist --configuration=$configuration
#RUN npm run build --prod

#base image
FROM nginx:alpine

#remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

#copy nginx configuration
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY ["./nginx.conf", "/etc/nginx/conf.d/default.conf"]
COPY src/nginx/nginx.local.conf /etc/nginx/nginx.conf
##COPY server/nginx/id-local.crt /etc/ssl/certs/id-local.owlet.com.crt
##COPY server/nginx/id-local.key /etc/ssl/private/id-local.owlet.com.key
##COPY server/nginx/www-local.crt /etc/ssl/certs/www-local.owlet.com.crt
##COPY server/nginx/www-local.key /etc/ssl/private/www-local.owlet.com.key

#copy artifact build from the 'build env'
#COPY --from=build /app/dist /usr/share/nginx/html

#expose port 80
#EXPOSE 80

#run nginx
#CMD ["nginx", "-g", "deamon off;"]