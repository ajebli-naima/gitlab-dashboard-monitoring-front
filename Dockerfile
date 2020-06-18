FROM nginx:1.17.9

COPY dist/fuse /var/www/html/dashboard
COPY site.conf /etc/nginx/conf.d/default.conf
