<?php

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    echo "Hello world";
};