<?php
namespace Michaelbelgium\Profileviews\Listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\GetApiRelationship;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\UserSerializer;
use Michaelbelgium\Profileviews\Serializers\UserProfileViewSerializer;

class AddUserProfileViewsRelationship
{
	const RELATIONSHIP = "profileViews"; //$user->profileViews()

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
		$events->listen(WillGetData::class, [$this, 'includeTagsRelationship']);
		$events->listen(GetApiRelationship::class, [$this, 'getApiRelationship']);
	}

	/**
	 * @param GetApiRelationship $event
	 * @return \Tobscure\JsonApi\Relationship|null
	 */
	public function getApiRelationship(GetApiRelationship $event)
	{
		if ($event->isRelationship(UserSerializer::class, self::RELATIONSHIP)) {
			return $event->serializer->hasMany($event->model, UserProfileViewSerializer::class, self::RELATIONSHIP);
		}
	}

	/**
     * @param WillGetData $event
     */
	public function includeTagsRelationship(WillGetData $event)
	{
		if($event->controller->serializer == UserSerializer::class)
			$event->addInclude([self::RELATIONSHIP, self::RELATIONSHIP.'.viewer', self::RELATIONSHIP.'.viewedUser']);//".x" comes from model relationship UserProfileView
	}
}