<?php
namespace michaelbelgium\profileviews\listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\GetModelRelationship;
use Flarum\User\User;

class AddUserProfileViewsRelationship
{
	const RELATIONSHIP = "profileViews";
	const RELATIONSHIP_OTHER = "viewedProfiles";

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
		$events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
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
}