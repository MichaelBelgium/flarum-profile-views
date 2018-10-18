<?php

namespace michaelbelgium\profileviews\models;

use Flarum\Database\AbstractModel;


class ProfileView extends AbstractModel
{
	protected $table = "users_profile_views";

	protected $fillable = ["ip", "viewer_id", "viewed_id"];
}
