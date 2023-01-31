FROM nginx
COPY dist /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
