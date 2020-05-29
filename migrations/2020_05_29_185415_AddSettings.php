<?php

use Flarum\Database\Migration;

return Migration::addSettings([
    'michaelbelgium-profileviews.track_guests' => false,
    'michaelbelgium-profileviews.max_listcount' => 5
]);