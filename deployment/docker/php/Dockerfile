ARG VERSION

FROM php:${VERSION}-fpm-alpine

ARG ENVIRONMENT

LABEL maintainer "Sagar Lotiya <sagar@aspl.in>"

## Install system dependencies
RUN apk --no-cache add curl

## Install system dependencies
RUN phpizeDeps=' \
    git \
    autoconf \
    gcc \
    g++ \
    make \
    zlib-dev \
    libzip-dev \
    # for bz2
    bzip2-dev \
    wget \
    # for xslt
    libxslt-dev \
    # for intl extension
    icu-dev \
    openssl-dev \
    # for gettext
    gettext-dev \
    # for mcrypt
    libmcrypt-dev \
    # for GD
    freetype-dev \
    libpng-dev  \
    libjpeg-turbo-dev \
' \
&&  apk update \
&&  apk add --no-cache --virtual .build-deps \
    $phpizeDeps \
&&  apk add --no-cache imagemagick \
    imagemagick-dev \
    #wkhtmltopdf \
    mysql-client \
    icu-libs \
    icu-libs \
    perl-xml-twig \
    libxslt

## Install php extensions
RUN	phpModules=' \
	bz2 \
	calendar \
	exif \
	gd \
	gettext \
	intl \
	mysqli \
	pdo_mysql \
	opcache \
	pcntl \
	shmop \
	soap \
	sockets \
	sysvmsg \
	sysvsem \
	sysvshm \
	wddx \
	xsl \
	zip \
' \
&& docker-php-ext-configure gd \
    --enable-gd-native-ttf \
    --with-freetype-dir=/usr/include/freetype2 \
    --with-png-dir=/usr/include \
    --with-jpeg-dir=/usr/include \
&& docker-php-ext-install $phpModules

## Install pecl extensions
RUN peclModules=' \
	igbinary \
	msgpack \
	imagick \
    apcu \
    apcu_bc-beta \
	redis-3.1.6 \
	mcrypt \
' \
&& peclModulesNoVersionNumbers='\
	igbinary \
	msgpack \
	imagick \
	redis \
	apcu \
' \
&& pecl install $peclModules \
&& docker-php-ext-enable $peclModulesNoVersionNumbers

RUN if [ "$ENVIRONMENT" = "local" ] ; then apk add nodejs-current npm; fi

RUN if [ "$ENVIRONMENT" = "local" ] ; then npm install -g yarn; fi

RUN ln -s /usr/local/bin/php /usr/bin/php

#RUN npm install compression-webpack-plugin --save-dev

## Cleanup
RUN apk del .build-deps \
    && rm -rf /tmp/*

RUN if [ "$ENVIRONMENT" = "local" ] ; then apk add git ; fi

ENV LANG en_US.UTF-8 && LANGUAGE en_US:en && LC_ALL en_US.UTF-8
ENV ME=php \
    SRC=./
ENV CONFS=${SRC}deployment/docker/${ME}/confs/

# using https://github.com/php/php-src/blob/PHP-7.0/php.ini-development
COPY ${CONFS}default.ini /usr/local/etc/php/conf.d/default.ini
COPY ${CONFS}zz-docker.conf /usr/local/etc/php-fpm.d/zz-docker.conf

COPY ./ /web/fads6/
WORKDIR /web/fads6/

RUN sed -i "s/\"node-sass\": \"4.7.2\"/\"node-sass\": \"4.12.0\"/g" vendor/fads/platform/package.json
RUN sed -i "s/\"node-sass\": \"4.7.2\"/\"node-sass\": \"4.12.0\"/g" vendor/fads/frontend/package.json

COPY --from=wkhtmltopdf /bin/wkhtmltopdf /usr/local/bin/wkhtmltopdf
COPY --from=wkhtmltopdf /bin/wkhtmltoimage /usr/local/bin/wkhtmltoimage
COPY --from=wkhtmltopdf /bin/libwkhtmltox* /usr/local/bin/

ENV ENTRY_ENVIRONMENT=${ENVIRONMENT}

ADD ${SRC}deployment/docker/${ME}/start-up /usr/local/bin/start-up
RUN chmod 0777 /usr/local/bin/start-up -R

ENTRYPOINT ["/usr/local/bin/start-up"]
CMD []

EXPOSE 9001