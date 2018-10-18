<?php

namespace michaelbelgium\profileviews\serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use michaelbelgium\profileviews\listeners\AddRelationship;

class ProfileViewSerializer extends AbstractSerializer
{
	protected $type = AddRelationship::RELATIONSHIP_NAME;

	protected function getDefaultAttributes($model)
	{
		return [
			'id' => $model->id,
			'ip' => $model->ip,
			'viewer_id' => $model->viewer_id,
			'viewed_id' => $model->viewed_id
		];
	}
}
