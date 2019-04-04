<?php

namespace UserFrosting\Sprinkle\Site\Controller;

use Carbon\Carbon;
use UserFrosting\Sprinkle\Account\Database\Models\User;
use UserFrosting\Sprinkle\Account\Database\Models\LGame;
use UserFrosting\Sprinkle\Core\Database\Models\Version;
use UserFrosting\Sprinkle\Core\Util\EnvironmentInfo;
use UserFrosting\Support\Exception\ForbiddenException;

use Slim\Http\Request;
use Slim\Exception\NotFoundException;

use Reflex\Paladins\API;
use Onoi\Cache\ZendCache;
use Onoi\Cache\DoctrineCache;
use Onoi\Cache\MediaWikiCache;

use UserFrosting\Sprinkle\Core\Controller\SimpleController;

class PageController extends SimpleController {
  public function pageIndex($request, $response, $args) {
    // GET parameters
    $params = $request->getQueryParams();

    //** @var UserFrosting\Sprinkle\Account\Authorize\AuthorizationManager */
    $authorizer = $this->ci->authorizer;

    /** @var UserFrosting\Sprinkle\Account\Database\Models\User $currentUser */
    $currentUser = $this->ci->currentUser;

    // Access-controlled page
    if (!$authorizer->checkAccess($currentUser, 'uri_dashboard')) {
        throw new ForbiddenException();
    }

    /** @var UserFrosting\Sprinkle\Core\Util\ClassMapper $classMapper */
    $classMapper = $this->ci->classMapper;

    // Probably a better way to do this
    $teams = $classMapper->staticMethod('LTeam', 'where', 'user_id', $currentUser->id)
      ->orderBy('name', 'desc')
      ->get();

    // Probably a better way to do this
    $maps = $classMapper->staticMethod('LMap', 'orderBy', 'name', 'desc')
      ->get();

    // Probably a better way to do this
    $patches = $classMapper->staticMethod('LPatch', 'orderBy', 'id', 'desc')
      ->get();

    // Probably a better way to do this
    $champions = $classMapper->staticMethod('LChampion', 'where', 'lTitle_id', '2')
      ->select('lChampions.id', 'lChampions.slug', 'lChampions.name',
        'roleName.name AS roleName'
      )
      ->leftJoin('lRoles AS roleName', 'lChampions.lRole_id', '=', 'roleName.id')
      ->orderBy('name', 'asc')
      ->get();

    //Get all the games
    $par = array();
    //$game = new LGame();
    $games; //= $game->read($params, $currentUser);

    //Stupid paladins api that doesnt respond with custom games...
    //$api = new API('3022','973878F147394E06945258660DDB56DB', 'http://api.paladins.com/paladinsapi.svc/');
    
    // optional session caching via many providers
    // see https://github.com/onoi/cache/
    //$api->useCache(new ZendCache($zendCacheThing));
    //$api->useCache(new DoctrineCache($doctrineCacheThing));
    //$api->useCache(new MediaWikiCache(wfGetCache(CACHE_ANYTHING)));

    //$api->preferredFormat('json');

    //$api->preferredLanguage('es');

    //$playerData = $api->request('createsession');
    //$playerData = $api->createsession();
    //$playerD = $api->getplayer('PowTecH');
    //$playerD = $api->getmatchdetails("808047627");
    //$playerD = $api->getmatchdetails("790990354");//custom
    //$playerD = $api->getesportsproleaguedetails();
    //$playerD = $api->getmatchdetails("807637965");
    //$request->fullUrlWithQuery(['mt' => 'xg']);

    return $this->ci->view->render($response, 'pages/index.html.twig', [
      'teams' => $teams,
      'maps' => $maps,
      'patches' => $patches,
      'champions' => $champions,
      'games' => $games,
      'test1' => json_encode($params),
      'test2' => $test2,
      //'paladins' => json_encode($playerD)
    ]);
  }

  public function pageInput($request, $response, $args) {

    //** @var UserFrosting\Sprinkle\Account\Authorize\AuthorizationManager */
    $authorizer = $this->ci->authorizer;

    /** @var UserFrosting\Sprinkle\Account\Database\Models\User $currentUser */
    $currentUser = $this->ci->currentUser;

    // Access-controlled page
    if (!$authorizer->checkAccess($currentUser, 'uri_dashboard')) {
        throw new ForbiddenException();
    }

    /** @var UserFrosting\Sprinkle\Core\Util\ClassMapper $classMapper */
    $classMapper = $this->ci->classMapper;

    // Probably a better way to do this
    $teams = $classMapper->staticMethod('LTeam', 'where', 'user_id', $currentUser->id)
      ->orderBy('name', 'desc')
      ->get();

    // Probably a better way to do this
    $maps = $classMapper->staticMethod('LMap', 'orderBy', 'name', 'desc')
      ->get();

    // Probably a better way to do this
    $patches = $classMapper->staticMethod('LPatch', 'orderBy', 'id', 'desc')
      ->get();

    // Probably a better way to do this
    $champions = $classMapper->staticMethod('LChampion', 'where', 'lTitle_id', '1')
      ->select('lChampions.id', 'lChampions.slug', 'lChampions.name',
        'roleName.name AS roleName'
      )
      ->leftJoin('lRoles AS roleName', 'lChampions.lRole_id', '=', 'roleName.id')
      ->orderBy('name', 'asc')
      ->get();

    return $this->ci->view->render($response, 'pages/input.html.twig', [
      'teams' => $teams,
      'maps' => $maps,
      'patches' => $patches,
      'champions' => $champions,
    ]);
  }
  
  public function pageAccount($request, $response, $args) {
      return $this->ci->view->render($response, 'pages/dashboard.html.twig');
  }
  
  public function pageMembers($request, $response, $args) {
      return $this->ci->view->render($response, 'pages/members.html.twig');
  }
}