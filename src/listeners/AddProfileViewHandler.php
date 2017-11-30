<?php
namespace michaelbelgium\profileviews\listeners;

use Flarum\Api\Controller\ShowUserController;
use Flarum\Event\PrepareApiData;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Core\User;

class AddProfileViewHandler
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiData::class, [$this, "confViews"]);
    }

    public function confViews(PrepareApiData $event)
    {
        if($event->isController(ShowUserController::class))
        {
            /** @var User $profile */
            $user = $event->data;

            $user->views++;
            $user->save();
        }
    }
}