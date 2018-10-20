<?php

namespace michaelbelgium\profileviews\serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use michaelbelgium\profileviews\listeners\AddRelationship;
use Flarum\Api\Serializer\UserSerializer;

class ProfileViewSerializer extends AbstractSerializer
{
	protected $type = AddRelationship::RELATIONSHIP_NAME;

	protected function getDefaultAttributes($model)
	{
		return [];
	}

	/**
	 * Needs to be added in AddRelationship.php > configureApiController too
	 */
	protected function userviewer($profileview)
	{
		return $this->hasOne($profileview, UserSerializer::class, 'viewer_id');
	}

	/**
	 * Needs to be added in AddRelationship.php > configureApiController too
	 */
	protected function userviewed($profileview)
	{
		return $this->hasOne($profileview, UserSerializer::class, 'viewed_id');
	}
}
