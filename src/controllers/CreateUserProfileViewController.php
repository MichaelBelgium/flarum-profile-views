<?php

namespace Michaelbelgium\Profileviews\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\EmptyResponse;
use Flarum\User\User;
use Carbon\Carbon;
use Michaelbelgium\Profileviews\Models\UserProfileView;

class CreateUserProfileViewController implements RequestHandlerInterface
{
    public function handle(Request $request): Response
    {
        $userId = array_get($request->getQueryParams(), 'id');
        $viewerId = array_get($request->getParsedBody(), 'viewer');
        $user = User::find($userId);

        $test = $user->profileViews;
        $testOther = $user->viewedProfiles;

        $profileView = $user->profileViews()->where('viewer_id', $viewerId)->first();

        if(is_null($profileView)) {
            $profileView = new UserProfileView();
            $profileView->viewedUser()->associate($user);
            $profileView->viewer()->associate(User::find($viewerId));
        }

        $profileView->visited_at = Carbon::now();
        $profileView->save();
        
        return new EmptyResponse();
    }
}