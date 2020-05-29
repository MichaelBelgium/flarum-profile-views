<?php

namespace Michaelbelgium\Profileviews\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\JsonResponse;
use Flarum\User\User;
use Carbon\Carbon;
use Flarum\Settings\SettingsRepositoryInterface;
use Michaelbelgium\Profileviews\Models\UserProfileView;

class CreateUserProfileViewController implements RequestHandlerInterface
{
    private $settings;

    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;
    }

    public function handle(Request $request): Response
    {
        $userId = array_get($request->getParsedBody(), 'viewedUser');
        $visitor = array_get($request->getParsedBody(), 'viewer');

        if(!$this->settings->get('michaelbelgium-profileviews.track_guests', false) && $visitor === null) {
            return new JsonResponse(['error' => 'Tracking guests not been set']);
        }

        if($userId == $visitor) return new JsonResponse(['error' => 'Visitor is the same as viewed user']);

        $user = User::find($userId);
        $profileView = $user->profileViews()->where('viewer_id', $visitor)->first();

        if(is_null($profileView)) {
            $profileView = new UserProfileView();
            $profileView->viewedUser()->associate($user);
            if($visitor !== null) {
                $profileView->viewer()->associate(User::find($visitor));
            }
        }

        $profileView->visited_at = Carbon::now();
        $profileView->save();
        
        return new JsonResponse($profileView->toArray());
    }
}