<?php
namespace michaelbelgium\profileviews\listeners;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserApiAttributes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'addApiAttributes']);
    }

    /**
     * @param PrepareApiAttributes $event
     */
    public function addApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(UserSerializer::class))
            $event->attributes['views'] = $event->model->views;
    }
}