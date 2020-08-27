#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_1 $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_1 --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_1 --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_1 --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_1 --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_1 --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_1 --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_2 $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_2 --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_2 --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_2 --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_2 --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_2 --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_2 --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_3 $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_3 --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_3 --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_3 --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_3 --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_3 --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_3 --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_4 $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_4 --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_4 --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_4 --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_4 --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_4 --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_4 --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_5 $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_5 --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_5 --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_5 --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_5 --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_5 --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-quick-statistics-count --category_field=category_5 --date_type="last_to_last_month" $1