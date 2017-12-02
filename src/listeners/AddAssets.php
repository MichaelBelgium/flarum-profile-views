<?php


namespace michaelbelgium\profileviews\listeners;

use Flarum\Event\ConfigureLocales;
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
        $events->listen(ConfigureLocales::class, [$this, 'configLocales']);
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

    /**
     * @param ConfigureLocales $event
     */
    public function configLocales(ConfigureLocales $event)
    {
        $event->locales->addTranslations('en', __DIR__.'/../../locale/en.yml');
    }
}