<?php

use Illuminate\Contracts\Events\Dispatcher;
use michaelbelgium\profileviews\listeners;

return function (Dispatcher $events) {
    $events->subscribe(listeners\AddProfileViewHandler::class);
    $events->subscribe(listeners\AddUserApiAttributes::class);
    $events->subscribe(listeners\AddAssets::class);
};