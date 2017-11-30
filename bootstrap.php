<?php

use Illuminate\Contracts\Events\Dispatcher;
use michaelbelgium\profileviews\listeners\AddProfileViewHandler;

return function (Dispatcher $events) {
    $events->subscribe(AddProfileViewHandler::class);
};