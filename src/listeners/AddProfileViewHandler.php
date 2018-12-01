<?php
namespace michaelbelgium\profileviews\listeners;

use Flarum\Api\Controller\ShowUserController;
use Flarum\Api\Event\WillSerializeData;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\User;
use Flarum\User\Guest;
use Illuminate\Support\Facades\DB;

class AddProfileViewHandler
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(WillSerializeData::class, [$this, "confViews"]);
    }

    public function confViews(WillSerializeData $event)
    {
        if($event->isController(ShowUserController::class))
        {
            $id = $event->request->getQueryParams()["id"];
            if(is_numeric($id)) return;

            $serverParams = $event->request->getServerParams();
            $ip = $serverParams['REMOTE_ADDR'];

            if (isset($serverParams["HTTP_CF_CONNECTING_IP"]))
                $ip = $serverParams["HTTP_CF_CONNECTING_IP"];
            
            $visited_user = $event->data;

            $resultCount = $visited_user->profileViews()->wherePivot('ip', '=', $ip)->count();

            if($resultCount > 0) return;

            $visited_user->profileViews()->attach($user, ["ip" => $ip]);
        }
    }
}
