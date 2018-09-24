<?php
namespace michaelbelgium\profileviews\listeners;

use Flarum\Api\Controller\ShowUserController;
use Flarum\Event\PrepareApiData;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Core\User;
use Illuminate\Support\Facades\DB;

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
            $id = $event->request->getQueryParams()["id"];
            if(is_numeric($id)) return;

            $serverParams = $event->request->getServerParams();
            $ip = $serverParams['REMOTE_ADDR'];

            if (isset($serverParams["HTTP_CF_CONNECTING_IP"]))
                $ip = $serverParams["HTTP_CF_CONNECTING_IP"];

            /** @var User $profile */
            $user = $event->actor;
            $user_viewing = $event->data;

            $resultCount = app('flarum.db')
                ->table("users_profile_views")
                ->where("ip", $ip)
                ->where("viewed_id", $user_viewing->id)
                ->count();

            if($resultCount > 0) return;

            $user_viewing->views++;
            $user_viewing->save();

            app('flarum.db')->table("users_profile_views")->insert(array(
                "ip" => $ip,
                "user_id" => $user->id,
                "viewed_id" => $user_viewing->id
            ));
        }
    }
}
