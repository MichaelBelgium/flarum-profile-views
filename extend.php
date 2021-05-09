<?php

use Flarum\Api\Controller\ShowUserController;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Database\AbstractModel;
use Flarum\Extend\ApiController;
use Flarum\Extend\ApiSerializer;
use Michaelbelgium\Profileviews\Listeners\AddUserProfileViewsRelationship;
use Michaelbelgium\Profileviews\Controllers\CreateUserProfileViewController;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;
use Flarum\Extend\Model;
use Flarum\Extend\Routes;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Michaelbelgium\Profileviews\Models\UserProfileView;
use Michaelbelgium\Profileviews\Serializers\UserProfileViewSerializer;

const PV_RELATIONSHIP = "profileViews"; //$user->profileViews()
const PV_RELATIONSHIP_LATEST = "latestProfileViews";

$settings = app(SettingsRepositoryInterface::class);

return [
    (new Frontend('forum'))
        ->js(__DIR__. '/js/dist/forum.js')
        ->css(__DIR__. '/less/extension.less'),

    (new Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Locales(__DIR__ . '/locale'),

    (new Routes('api'))
        ->post('/profileview', 'profileview.create', CreateUserProfileViewController::class),

    (new Model(User::class))->relationship(PV_RELATIONSHIP, function(AbstractModel $model) {
        return $model->hasMany(UserProfileView::class, 'viewed_user_id')->orderBy('visited_at', 'DESC');
    })->relationship(PV_RELATIONSHIP_LATEST, function (AbstractModel $model) use ($settings) {
        return $model->{PV_RELATIONSHIP}()->limit($settings->get('michaelbelgium-profileviews.max_listcount'));
    }),

    (new ApiSerializer(UserSerializer::class))
        ->hasMany(PV_RELATIONSHIP, UserProfileViewSerializer::class)
        ->hasMany(PV_RELATIONSHIP_LATEST, UserProfileViewSerializer::class),

    (new ApiController(ShowUserController::class))
        //".x" comes from model relationship UserProfileView
        ->addInclude([PV_RELATIONSHIP, PV_RELATIONSHIP_LATEST, PV_RELATIONSHIP_LATEST.'.viewer', PV_RELATIONSHIP_LATEST.'.viewedUser']),
];