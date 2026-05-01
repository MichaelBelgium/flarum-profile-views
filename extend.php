<?php

use Flarum\Api\Endpoint;
use Flarum\Api\Resource\UserResource;
use Flarum\Api\Schema;
use Flarum\Database\AbstractModel;
use Flarum\Extend;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Michaelbelgium\Profileviews\Api\Resource\UserProfileViewResource;
use Michaelbelgium\Profileviews\Models\UserProfileView;

const PV_RELATIONSHIP = 'profileViews'; //$user->profileViews()
const PV_RELATIONSHIP_LATEST = 'latestProfileViews';

$settings = app(SettingsRepositoryInterface::class);

return [
    new Extend\Frontend('forum')
        ->js(__DIR__. '/js/dist/forum.js')
        ->css(__DIR__. '/less/extension.less'),

    new Extend\Frontend('admin')
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),

    new Extend\Model(User::class)
        ->relationship(PV_RELATIONSHIP, fn(AbstractModel $model) => $model->hasMany(UserProfileView::class, 'viewed_user_id')->orderBy('visited_at', 'DESC'))
        ->relationship(PV_RELATIONSHIP_LATEST, function (AbstractModel $model) use ($settings) {
            return $model->{PV_RELATIONSHIP}()->limit($settings->get('michaelbelgium-profileviews.max_listcount'));
        }),

    new Extend\ApiResource(UserResource::class)
        ->fields(fn () => [
            Schema\Integer::make('profileViewsCount')
                ->countRelation(PV_RELATIONSHIP),
            Schema\Relationship\ToMany::make(PV_RELATIONSHIP_LATEST)
                ->includable()
                ->type('userprofileview'),
        ])
        ->endpoint(
            'show',
            fn (Endpoint\Show $endpoint) => $endpoint->defaultInclude([
                PV_RELATIONSHIP_LATEST,
                PV_RELATIONSHIP_LATEST . '.viewer',
            ])
        ),

    new Extend\ApiResource(UserProfileViewResource::class),
];