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
        $ip = $serverParams['REMOTE_ADDR'];

        if (isset($serverParams["HTTP_CF_CONNECTING_IP"]))
            $ip = $serverParams["HTTP_CF_CONNECTING_IP"];

        $resultCount = $user->profileViews()->wherePivot('ip', '=', $ip)->count();

        if($resultCount == 0)
            $user->profileViews()->attach(User::find($viewerId), ["ip" => $ip]);
        
        return new EmptyResponse();
    }
}