#! /bin/bash

set -e

if [ $# -lt 1 ]; then
    echo "Usage: $0 ENVIRONMENT"
    echo "  ENVIRONMENT: dev | test | production"
    exit 1
fi
ENVIRONMENT=$1

echo "Input username (for example: amitl): "
read username

echo "Input admin url (for example: aml.fads6-admin.207.aum): "
read baseurl

echo "Input DB url (for example: mysql://root:root@192.168.100.64:3306/fiareads_fads6_aml?charset=utf8mb4): "
read databaseurl

echo "Input front url (for example: aml.fads6-frontend.207.aum): "
read fronturl

echo "Input front api url (for example: http://aml.fads6-admin.207.aum): "
read frontapiurl

echo "Url scheme for admin (for example: http|https): "
read adminscheme

echo "Url scheme for front (for example: http|https): "
read frontscheme

echo "Error email (for example: amitl@aum203.aum.com): "
read erroremail

curl -s http://getcomposer.org/installer | php
git pull
cd vendor/fads/platform
git pull
cd ../../../

if [ "$ENVIRONMENT" = 'dev' ]; then
    cp config/packages/parameters.yaml.dist config/packages/parameters.yaml
    replace "username" $username -- config/packages/parameters.yaml
    replace "erroremail" $erroremail -- config/packages/parameters.yaml
    replace "baseurl" $baseurl -- config/packages/parameters.yaml
    replace "fronturl" $fronturl -- config/packages/parameters.yaml
    replace "adminscheme" $adminscheme -- config/packages/parameters.yaml
    replace "frontscheme" $frontscheme -- config/packages/parameters.yaml
    cp .env.dist .env
    replace "bucketusername" $username -- .env
    replace "databaseurl" $databaseurl -- .env
fi

php -d memory_limit=512M composer.phar install

#php bin/console doctrine:database:drop --force
#php bin/console doctrine:database:create
php -d memory_limit=512M bin/console doctrine:schema:update --force
#php bin/console doctrine:fixtures:load

php -d memory_limit="512M" bin/console cache:clear

cd vendor/fads/frontend
git pull
cd ../../..
if [ "$ENVIRONMENT" = 'dev' ]; then
    cp .frontenv.dist .frontenv
    replace "fronturl" $fronturl -- .frontenv
    replace "frontapiurl" $frontapiurl -- .frontenv
    replace "frontscheme" $frontscheme -- .frontenv
    replace "bucketusername" $username -- .frontenv
    replace "erroremail" $erroremail -- .frontenv
fi
rm -rf ./node_modules
#Admin side commands for symlink and web encore cache clear etc.
php -d memory_limit="512M" bin/console cache:clear
yarn install --cwd="vendor/fads/platform/" --modules-folder="./node_modules/"
php bin/console assets:install public --symlink
php -d memory_limit="512M" bin/console fa:assets:install
#Front side commands for symlink and web encore cache clear etc.
php -d memory_limit="512M" bin/front cache:clear
yarn install --cwd="vendor/fads/frontend/" --modules-folder="./node_modules/"
php bin/front assets:install front --symlink
php -d memory_limit="512M" bin/front fa:assets:install
#Now dump will be done for both in one command
if [ "$ENVIRONMENT" = 'production' ]; then
    ./node_modules/.bin/encore production --optimize-minimize
else
    ./node_modules/.bin/encore dev
fi
php bin/console fa:redis:flushall
php bin/console fa:generate:swagger-api-doc
#openssl genrsa -out config/jwt/private.pem -aes256 4096
#openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem


