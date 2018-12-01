<?php
namespace michaelbelgium\profileviews\listeners;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Api\Event\Serializing;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserApiAttributes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'addApiAttributes']);
    }

    /**
     * @param Serializing $event
     */
    public function addApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(UserSerializer::class))
            $event->attributes['views'] = $event->model->view_count;
    }
}