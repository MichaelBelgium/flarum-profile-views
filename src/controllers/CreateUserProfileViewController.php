<?php

namespace Michaelbelgium\Profileviews\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\EmptyResponse;
use Flarum\User\User; 

class CreateUserProfileViewController implements RequestHandlerInterface
{
    public function handle(Request $request): Response
    {
        $userId = array_get($request->getQueryParams(), 'id');
        $viewerId = array_get($request->getParsedBody(), 'viewer');
        $user = User::find($userId);
        $serverParams = $request->getServerParams();

        $profileView = $user->profileViews()->where('viewer_id', $viewerId);

        $count = $profileView->count();

        if($count == 0)
            $user->profileViews()->attach(User::find($viewerId), ["visited_at" => date('Y-m-d H:i:s')]);
        else 
            $profileView->update(["visited_at" => date('Y-m-d H:i:s')]);
        
        return new EmptyResponse();
    }
}