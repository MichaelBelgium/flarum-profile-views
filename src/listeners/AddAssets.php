<?php


namespace michaelbelgium\profileviews\listeners;

use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;

class AddAssets
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'configAssets']);
    }

    /**
     * @param ConfigureWebApp $event
     */
    public function configAssets(ConfigureWebApp $event)
    {
        if($event->isForum())
        {
            $event->addAssets(__DIR__.'/../../js/forum/dist/extension.js');
            $event->addBootstrapper('michaelbelgium/flarum-profile-views/main');
        }
    }
}