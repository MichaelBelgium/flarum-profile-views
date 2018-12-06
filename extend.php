<?php
use michaelbelgium\profileviews\listeners\AddUserProfileViewsRelationship;
use michaelbelgium\profileviews\controllers\CreateUserProfileViewController;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;
use Flarum\Extend\Routes;

return [
    (new Frontend('forum'))
        ->js(__DIR__. '/js/dist/forum.js')
        ->css(__DIR__. '/less/extension.less'),

    new Locales(__DIR__ . '/locale'),

    (new Routes('api'))
        ->post('/profileview/{id}', 'profileview.add', CreateUserProfileViewController::class),

    function (Dispatcher $events) {
        $events->subscribe(AddUserProfileViewsRelationship::class);
    }
];