<?php
echo "<pre>";
passthru('php artisan view:clear 2>&1');
passthru('php artisan cache:clear 2>&1');
passthru('php artisan config:cache 2>&1');
echo "done";
echo "</pre>";
