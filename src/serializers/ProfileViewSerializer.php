<?php

namespace michaelbelgium\profileviews\serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use michaelbelgium\profileviews\listeners\AddRelationship;

class ProfileViewSerializer extends AbstractSerializer
{
	protected $type = AddRelationship::RELATIONSHIP_NAME;

	protected function getDefaultAttributes($model)
	{
		return $model->toArray();
	}
}
