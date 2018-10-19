<?php

namespace michaelbelgium\profileviews\models;

use Flarum\Database\AbstractModel;
use Flarum\Core\User;


class ProfileView extends AbstractModel
{
	protected $table = "users_profile_views";

	protected $fillable = ["ip", "viewer_id", "viewed_id"];

	public function viewer()
	{
		return $this->hasOne(User::class, 'id', 'viewer_id');
	}

	public function viewedUser()
	{
		return $this->hasOne(User::class, 'id', 'viewed_id');
	}
}
