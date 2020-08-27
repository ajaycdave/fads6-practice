<?php

echo date('Y-m-d H:i:s')."\n<pre>";
echo 'Uptime: '.gmdate('H:i:s', time() - (getenv('STARTTIME') !== false ? getenv('STARTTIME') : 0))."\n";

