<?php
namespace MichaelBelgium\Profileviews\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Michaelbelgium\Profileviews\Models\UserProfileView;
use Michaelbelgium\Profileviews\Serializers\UserProfileViewSerializer;

class ListProfileViewsController extends AbstractListController
{
	public $serializer = UserProfileViewSerializer::class;
	
	public $include = ['viewer', 'viewedUser'];

	public $sort = ['visited_at' => 'desc'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
		// $this->extractInclude($request);

		$sort = $this->extractSort($request);

		$query = UserProfileView::query();

		foreach ($sort as $field => $order) {
			$query->orderBy(snake_case($field), $order);
		}

		return $query->get();
    }
}