<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users_profile_views', function (Blueprint $table) {
            $table->string('ip', 16)->change();
            $table->integer('viewed_id')->unsigned();

            $table->foreign("viewed_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
    },

    'down' => function (Builder $schema) {
        $schema->table('users_profile_views', function (Blueprint $table) {
            $table->dropForeign(['viewed_id']);
            $table->dropColumn('viewed_id');
        });
    }
];
