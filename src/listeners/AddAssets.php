<?php


namespace michaelbelgium\profileviews\listeners;

use Flarum\Event\ConfigureLocales;
use Flarum\Frontend\Event\Rendering;
use Illuminate\Contracts\Events\Dispatcher;
use DirectoryIterator;

class AddAssets
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Rendering::class, [$this, 'configAssets']);
        $events->listen(ConfigureLocales::class, [$this, 'configLocales']);
    }

    /**
     * @param Rendering $event
     */
    public function configAssets(Rendering $event)
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
        foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'], false)) {
                $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
            }
        }
    }
}