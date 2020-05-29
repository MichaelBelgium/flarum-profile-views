<?php

use Flarum\Database\AbstractModel;
use Michaelbelgium\Profileviews\Listeners\AddUserProfileViewsRelationship;
use Michaelbelgium\Profileviews\Controllers\CreateUserProfileViewController;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;
use Flarum\Extend\Model;
use Flarum\Extend\Routes;
use Flarum\User\User;
use Michaelbelgium\Profileviews\Models\UserProfileView;

return [
    (new Frontend('forum'))
        ->js(__DIR__. '/js/dist/forum.js')
        ->css(__DIR__. '/less/extension.less'),

    (new Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Locales(__DIR__ . '/locale'),

    (new Routes('api'))
        ->post('/profileview', 'profileview.create', CreateUserProfileViewController::class),

    (new Model(User::class))->relationship(AddUserProfileViewsRelationship::RELATIONSHIP, function(AbstractModel $model) {
        return $model->hasMany(UserProfileView::class, 'viewed_user_id')->orderBy('visited_at', 'DESC');
    })->relationship(AddUserProfileViewsRelationship::RELATIONSHIP_OTHER, function(AbstractModel $model) {
        return $model->hasMany(UserProfileView::class, 'viewer_id')->orderBy('visited_at', 'DESC');
    }),

    function (Dispatcher $events) {
        $events->subscribe(AddUserProfileViewsRelationship::class);
    }
];