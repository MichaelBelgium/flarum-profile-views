<?php
namespace michaelbelgium\profileviews\listeners;

use Flarum\Api\Controller\ShowUserController;
use Flarum\Api\Event\WillSerializeData;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\User;
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

            /** @var User $profile */
            $user = $event->data;

            $resultCount = app('flarum.db')
                ->table("user_profile_views")
                ->where("ip", $ip)
                ->where("viewed_user_id", $user->id)
                ->count()
            ;

            if($resultCount > 0) return;

            $user->view_count++;
            $user->save();

            app('flarum.db')->table("user_profile_views")->insert(array("ip" => $ip, "viewed_user_id" => $user->id));
        }
    }
}
