<?php

use Flarum\Database\Migration;

return Migration::renameColumn("users", "views", "view_count");