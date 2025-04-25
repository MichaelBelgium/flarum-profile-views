<?php

namespace Michaelbelgium\Profileviews\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\User\User;
use Carbon\Carbon;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Michaelbelgium\Profileviews\Models\UserProfileView;

class CreateUserProfileViewController implements RequestHandlerInterface
{
    private $settings;

    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;
    }

    public function handle(Request $request): Response
    {
        $userId = (int)Arr::get($request->getParsedBody(), 'viewedUser');
        /** @var User $visitor */
        $visitor = $request->getAttribute('actor');

        if(!$this->settings->get('michaelbelgium-profileviews.track_guests', false) && $visitor->isGuest())
            return new JsonResponse(['error' => 'Tracking guests not been enabled']);

        if($userId == $visitor->id)
            return new JsonResponse(['error' => 'Visitor is the same as viewed user']);

        $user = User::find($userId);
        $profileView = $user->profileViews()->where('viewer_id', $visitor->id)->first();

        if(is_null($profileView))
        {
            $profileView = new UserProfileView();
            $profileView->viewedUser()->associate($user);

            if(!$visitor->isGuest())
                $profileView->viewer()->associate($visitor);
        }

        $profileView->visited_at = Carbon::now();
        $profileView->save();
        
        return new JsonResponse($profileView->toArray());
    }
}