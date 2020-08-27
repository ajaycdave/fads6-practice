ARG VERSION
ARG ENVIRONMENT

FROM nginx:${VERSION}-alpine

RUN set -x ; \
    adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

LABEL maintainer "Sagar Lotiya <sagar@aspl.in>"

ENV ME=nginx \
    SRC=./
ENV CONFS=${SRC}deployment/docker/${ME}/confs/

COPY ${CONFS}nginx.conf /etc/nginx/nginx.conf
COPY ${CONFS}/sites-enabled/ /etc/nginx/conf.d/
COPY ${CONFS}fastcgi_config /etc/nginx/fastcgi_config

COPY ./ /web/fads6/