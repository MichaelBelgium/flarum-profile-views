<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('users_profile_views', function (Blueprint $table) {
            $table->increments('id');
            $table->string("ip");
            $table->integer("user_id")->unsigned();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
    },

    'down' => function (Builder $schema) {
        $schema->drop('users_profile_views');
    }
];
