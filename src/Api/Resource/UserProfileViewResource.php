<?php

namespace Michaelbelgium\Profileviews\Api\Resource;

use Carbon\Carbon;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Michaelbelgium\Profileviews\Models\UserProfileView;
use Tobyz\JsonApiServer\Context as OriginalContext;

/**
 * @extends Resource\AbstractDatabaseResource<UserProfileView>
 */
class UserProfileViewResource extends Resource\AbstractDatabaseResource
{
    public function __construct(private readonly SettingsRepositoryInterface $settings)
    {
    }

    public function type(): string
    {
        return 'userprofileview';
    }

    public function model(): string
    {
        return UserProfileView::class;
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Create::make()
                ->authenticated(fn () => !$this->settings->get('michaelbelgium-profileviews.track_guests', false)),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\DateTime::make('visitedAt'),

            Schema\Relationship\ToOne::make('viewedUser')
                ->includable()
                ->writableOnCreate()
                ->requiredOnCreate()
                ->type('users'),

            Schema\Relationship\ToOne::make('viewer')
                ->nullable()
                ->includable()
                ->type('users'),
        ];
    }

    public function creating(object $model, OriginalContext $context): ?object
    {
        $actor = RequestUtil::getActor($context->request);

        if (!$actor->isGuest() && $model->viewed_user_id == $actor->id) {
            // Visitor is the same as viewed user.
            throw new ValidationException([
                'viewedUser' => 'You cannot view your own profile.',
            ]);
        }

        $existingView = UserProfileView::query()
            ->where('viewed_user_id', $model->viewed_user_id)
            ->when(
                $actor->isGuest(),
                fn ($query) => $query->whereNull('viewer_id'),
                fn ($query) => $query->where('viewer_id', $actor->id)
            )
            ->first();

        if ($existingView !== null) {
            $model = $existingView;
        }

        if ($actor->isGuest()) {
            $model->viewer()->dissociate();
        } else {
            $model->viewer()->associate($actor);
        }

        $model->visited_at = Carbon::now();

        return $model;
    }
}
