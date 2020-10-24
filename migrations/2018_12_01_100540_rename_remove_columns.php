<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('views');
        });

        $schema->disableForeignKeyConstraints();
        $schema->table('user_profile_views', function (Blueprint $table) {
            $table->renameColumn('user_id', 'viewed_user_id');
        });
        $schema->enableForeignKeyConstraints();
    },

    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->addColumn('integer', 'views');
        });

        $schema->disableForeignKeyConstraints();
        $schema->table('user_profile_views', function (Blueprint $table) {
            $table->renameColumn('viewed_user_id', 'user_id');
        });
        $schema->enableForeignKeyConstraints();
    }
];
