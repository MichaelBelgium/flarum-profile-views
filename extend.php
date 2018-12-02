<?php
use michaelbelgium\profileviews\listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;

return [
    (new Frontend('forum'))
        ->js(__DIR__. '/js/dist/forum.js')
        ->css(__DIR__. '/less/extension.less'),

    new Locales(__DIR__ . '/locale'),

    function (Dispatcher $events) {
        $events->subscribe(listeners\AddProfileViewHandler::class);
        $events->subscribe(listeners\AddUserProfileViewsRelationship::class);
    }
];