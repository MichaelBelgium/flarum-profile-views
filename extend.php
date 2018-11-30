<?php

use Illuminate\Contracts\Events\Dispatcher;
use michaelbelgium\profileviews\listeners;

use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;

return [
    (new Frontend('forum'))
        ->js(__DIR__. '/js/dist/forum.js'),

    new Locales(__DIR__ . '/locale'),

    function (Dispatcher $events) {
        $events->subscribe(listeners\AddProfileViewHandler::class);
        $events->subscribe(listeners\AddUserApiAttributes::class);
    }
];