<?php
/*
namespace UserFrosting\Sprinkle\Site\Controller;

use Carbon\Carbon;
use UserFrosting\Sprinkle\Account\Database\Models\User;
use UserFrosting\Sprinkle\Account\Database\Models\LGame;
use UserFrosting\Sprinkle\Core\Database\Models\Version;
use UserFrosting\Sprinkle\Core\Util\EnvironmentInfo;
use UserFrosting\Support\Exception\ForbiddenException;

use UserFrosting\Fortress\RequestSchema;
use UserFrosting\Fortress\RequestDataTransformer;
use UserFrosting\Fortress\ServerSideValidator;

use Slim\Http\Request;
use Slim\Exception\NotFoundException;

use Reflex\Paladins\API;
use Onoi\Cache\ZendCache;
use Onoi\Cache\DoctrineCache;
use Onoi\Cache\MediaWikiCache;

use UserFrosting\Sprinkle\Core\Controller\SimpleController;
*/
namespace UserFrosting\Sprinkle\Site\Controller;

use Carbon\Carbon;
use UserFrosting\Sprinkle\Account\Database\Models\User;
use UserFrosting\Sprinkle\Account\Database\Models\LGame;
use UserFrosting\Sprinkle\Core\Database\Models\Version;
use UserFrosting\Sprinkle\Core\Util\EnvironmentInfo;

use Illuminate\Database\Capsule\Manager as Capsule;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use UserFrosting\Fortress\RequestDataTransformer;
use UserFrosting\Fortress\RequestSchema;
use UserFrosting\Fortress\ServerSideValidator;
use UserFrosting\Fortress\Adapter\JqueryValidationAdapter;
use UserFrosting\Sprinkle\Account\Database\Models\Group;
use UserFrosting\Sprinkle\Core\Controller\SimpleController;
use UserFrosting\Support\Exception\BadRequestException;

use UserFrosting\Support\Exception\ForbiddenException;
use UserFrosting\Support\Exception\NotFoundException;

use Reflex\Paladins\API;
use Onoi\Cache\ZendCache;
use Onoi\Cache\DoctrineCache;
use Onoi\Cache\MediaWikiCache;

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
    $game = new LGame();
    $games = $game->read($params, $currentUser);

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
      'players' => $players,
      'teams' => $teams,
      'maps' => $maps,
      'patches' => $patches,
      'champions' => $champions,
      'games' => $games,
      'filters' => $params,
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
    $players = $classMapper->staticMethod('LPlayer', 'where', 'user_id', $currentUser->id)
      ->orderBy('name', 'asc')
      ->get();

    // Probably a better way to do this
    $teams = $classMapper->staticMethod('LTeam', 'where', 'user_id', $currentUser->id)
      ->orderBy('name', 'asc')
      ->get();

    // Probably a better way to do this
    $maps = $classMapper->staticMethod('LMap', 'orderBy', 'name', 'desc')
      ->orderBy('slug','asc')
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

    // Load validation rules
    $schema = new RequestSchema('schema://requests/input/create.yaml');
    $validator = new JqueryValidationAdapter($schema, $this->ci->translator);

    return $this->ci->view->render($response, 'pages/input.html.twig', [
      'players' => $players,
      'teams' => $teams,
      'maps' => $maps,
      'patches' => $patches,
      'champions' => $champions,
      'page' => [
          'validators' => $validator->rules('json', false)
      ]
    ]);
  }

  public function apiInput($request, $response, $args) {
    // Get POST parameters
    $params = $request->getParsedBody();

    /** @var \UserFrosting\Sprinkle\Account\Authorize\AuthorizationManager $authorizer */
    $authorizer = $this->ci->authorizer;

    /** @var \UserFrosting\Sprinkle\Account\Database\Models\Interfaces\UserInterface $currentUser */
    $currentUser = $this->ci->currentUser;

    // Access-controlled page
    if (!$authorizer->checkAccess($currentUser, 'create_group')) {
      throw new ForbiddenException();
    }

    /** @var \UserFrosting\Sprinkle\Core\Alert\AlertStream $ms */
    $ms = $this->ci->alerts;

    // Load the request schema
    $schema = new RequestSchema('schema://requests/input/create.yaml');

    // Whitelist and set parameter defaults
    $transformer = new RequestDataTransformer($schema);
    $data = $transformer->transform($params);

    // Validate request data
    $validator = new ServerSideValidator($schema, $this->ci->translator);
    if (!$validator->validate($data)) {
      $ms->addValidationErrors($validator);
      $error = true;
    }

    /** @var \UserFrosting\Sprinkle\Core\Util\ClassMapper $classMapper */
    $classMapper = $this->ci->classMapper;

    if ($error) {
      return $response->withJson([], 400);
    }
    
    /** @var \UserFrosting\Support\Repository\Repository $config */
    $config = $this->ci->config;

    // All checks passed!  log events/activities and create group
    // Begin transaction - DB will be rolled back if an exception occurs
    Capsule::transaction(function () use ($classMapper, $data, $ms, $config, $currentUser) {
      // Create the group
      //var_dump($data);
      $game = $classMapper->createInstance('LGame', $data);
      $game['user_id'] = $currentUser['id'];
      $game['lTitle_id'] = 2;
      $game['lPatch_id'] = $data['patch'];
      $game['ingame_id'] = $data['gameId'];
      $game['home'] = $data['teamHome'];
      $game['away'] = $data['teamAway'];
      $bans = json_decode($data['hiddenGameBans']);
      $picks = json_decode($data['hiddenGamePicks']);

      for ($i = 0; $i < sizeof($bans); $i++) {
        $game['b'.$i] = $bans[$i];
      }

      for ($i = 0; $i < sizeof($picks); $i++) {
        $game['p'.$i] = $picks[$i];
      }
      
      //var_dump($game);
      //return;
      // Store new group to database
      $game->save();

      $ms->addMessageTranslated('success', 'GROUP.CREATION_SUCCESSFUL', $data);
    });

    //return "hilio";
    return $response->withJson([], 200);
  }

  public function pageAccount($request, $response, $args) {
      return $this->ci->view->render($response, 'pages/dashboard.html.twig');
  }
  
  public function pageMembers($request, $response, $args) {
      return $this->ci->view->render($response, 'pages/members.html.twig');
  }
}