<?php
namespace michaelbelgium\profileviews\listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\User\User;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Api\Controller\ShowUserController;

class AddUserProfileViewsRelationship
{
	const RELATIONSHIP = "profileViews";
	const RELATIONSHIP_OTHER = "viewedProfiles";

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
		$events->listen(WillGetData::class, [$this, 'includeTagsRelationship']);
		$events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
		$events->listen(GetApiRelationship::class, [$this, 'GetApiRelationship']);
	}
	
	public function getModelRelationship(GetModelRelationship $event)
	{
		if($event->isRelationship(User::class, self::RELATIONSHIP))
		{
			return $event->model->belongsToMany(User::class, 'user_profile_views', 'viewed_user_id', 'viewer_id')->withPivot('ip');
		}

		if($event->isRelationship(User::class, self::RELATIONSHIP_OTHER))
		{
			return $event->model->belongsToMany(User::class, 'user_profile_views', 'viewer_id', 'viewed_user_id')->withPivot('ip');
		}
	}

	/**
	 * @param GetApiRelationship $event
	 * @return \Tobscure\JsonApi\Relationship|null
	 */
	public function getApiRelationship(GetApiRelationship $event)
	{
		if ($event->isRelationship(UserSerializer::class, self::RELATIONSHIP)) {
			return $event->serializer->hasMany($event->model, UserSerializer::class, self::RELATIONSHIP);
		}
	}

	/**
     * @param WillGetData $event
     */
    public function includeTagsRelationship(WillGetData $event)
    {
        if ($event->isController(ShowUserController::class))
            $event->addInclude([self::RELATIONSHIP, self::RELATIONSHIP_OTHER]);
    }
}