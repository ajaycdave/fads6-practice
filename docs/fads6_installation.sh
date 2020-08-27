git clone https://github.com/Fiare/fads6demo.git fads6
cd fads6
chmod -R 775 public/uploads
curl -s http://getcomposer.org/installer | php
cp config/packages/parameters.yaml.dist config/packages/parameters.yaml
replace "initial" "aml" -- config/packages/parameters.yaml
replace "username" "amitl" -- config/packages/parameters.yaml
php composer.phar install
cd vendor
git clone -b fads6.0 https://github.com/Fiare/fads6.git fads/platform
cd fads/platform
cd ../../../
cd vendor
git clone https://github.com/Fiare/fads6-frontend-bundle.git fads/frontend
cd ..
php composer.phar install
php bin/console fa:copy:entity
cp .env.dist .env
replace "initial" "aml" -- .env
replace "dbhost" "192.168.100.219" -- .env
php -d memory_limit="512M" bin/console doctrine:database:drop --force
php -d memory_limit="512M" bin/console doctrine:database:create
php -d memory_limit="512M" bin/console doctrine:schema:create
php -d memory_limit="512M" bin/console doctrine:fixtures:load
#Admin side commands for symlink and web encore cache clear etc.
php -d memory_limit="512M" bin/console cache:clear
yarn install --cwd="vendor/fads/platform/" --modules-folder="./node_modules/"
php -d memory_limit="512M" bin/console assets:install public --symlink
php -d memory_limit="512M" bin/console fa:assets:install
#Front side commands for symlink and web encore cache clear etc.
php -d memory_limit="512M" bin/front cache:clear
yarn install --cwd="vendor/fads/frontend/" --modules-folder="./node_modules/"
php -d memory_limit="512M" bin/front assets:install front --symlink
php -d memory_limit="512M" bin/front fa:assets:install
#Now dump will be done for both in one command
./node_modules/.bin/encore dev
