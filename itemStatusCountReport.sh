#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_created $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_published $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_reported $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_created --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_created --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_created --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_created --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_created --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_published --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_published --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_published --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_published --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_published --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_status_new_published --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_reported --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_reported --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_reported --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_reported --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_reported --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_1 --report_type=item_reported --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_created $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_published $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_reported $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_created --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_created --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_created --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_created --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_created --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_published --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_published --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_published --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_published --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_published --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_status_new_published --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_reported --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_reported --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_reported --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_reported --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_reported --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_2 --report_type=item_reported --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_created $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_published $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_reported $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_created --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_created --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_created --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_created --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_created --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_published --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_published --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_published --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_published --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_published --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_status_new_published --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_reported --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_reported --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_reported --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_reported --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_reported --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_3 --report_type=item_reported --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_created $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_published $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_reported $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_created --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_created --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_created --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_created --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_created --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_published --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_published --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_published --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_published --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_published --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_status_new_published --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_reported --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_reported --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_reported --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_reported --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_reported --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_4 --report_type=item_reported --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_created $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_published $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_reported $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_created --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_created --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_created --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_created --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_created --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_published --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_published --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_published --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_published --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_published --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_status_new_published --date_type="last_to_last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_reported --date_type="current_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_reported --date_type="last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_reported --date_type="last_to_last_week" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_reported --date_type="current_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_reported --date_type="last_month" $1
/usr/bin/php $DIR/bin/console fa:update:item-status-count --category_field=category_5 --report_type=item_reported --date_type="last_to_last_month" $1