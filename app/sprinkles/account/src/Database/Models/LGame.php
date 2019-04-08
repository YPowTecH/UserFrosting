<?php
/**
 * UserFrosting (http://www.userfrosting.com)
 *
 * @link      https://github.com/userfrosting/UserFrosting
 * @license   https://github.com/userfrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */
namespace UserFrosting\Sprinkle\Account\Database\Models;

use Illuminate\Database\Capsule\Manager as Capsule;
use UserFrosting\Sprinkle\Core\Database\Models\Model;

/**
 * LGame Class
 *
 * Represents a lGame object as stored in the database.
 *
 * @author PowTecH
 * @property int id
 * @property string title
 */
class LGame extends Model {
  /**
   * @var string The name of the table for the current model.
   */
  protected $table = 'lGames';

  /**
   * Fields that should be mass-assignable when creating a new User.
   *
   * @var string[]
   */
  protected $fillable = [
    'user_id',
    'lTitle_id',
    'lPatch_id',
    'ingame_id',
    'playDate',
    'created_at',
    'updated_at',
    'matchType',
    'pw',
    'map',
    'winner',
    'score',
    'home',
    'away',
    'b0',
    'b1',
    'b2',
    'b3',
    'p0',
    'p1',
    'p2',
    'p3',
    'p4',
    'p5',
    'p6',
    'p7',
    'p8',
    'p9',
    'player0',
    'player1',
    'player2',
    'player3',
    'player4',
    'player5',
    'player6',
    'player7',
    'player8',
    'player9'
  ];

  /**
   * @var bool Enable timestamps for this class.
   */
  public $timestamps = true;

  public function getUserId() {
    
  }

  public function read($p, $currentUser) {
    $wheres = "lGames.user_id = '{$currentUser->id}' ";
    $temp = "";

    if (sizeof($p) >= 0) {
      //Add this idoit
      /*
      if (isset($p['t'])) {
        $wheres .= "AND lGames.lTitle_id = '{$p['t']}'";
      }
      else {
        $wheres .= "AND lGames.lTitle_id = '{$currentUser->lFilter_id}'";
      }*/

      if (isset($p['mt']) && (isset($p['ha']) && ($p['ha'] == 'h' || $p['ha'] == 'a'))) {
        if ($p['ha'] == 'h') {
          $wheres .= "AND `hTeamName`.`abr` = '{$p['mt']}' ";
        }
        else {
          $wheres .= "AND `aTeamName`.`abr` = '{$p['mt']}' ";
        }
      }
      else if (isset($p['mt'])) {
        $wheres .= "AND (hTeamName.abr = '{$p['mt']}' OR aTeamName.abr = '{$p['mt']}') ";
        
        if (isset($p['ot'])) {
          $wheres .= "AND (";
          for ($i = 0; $i < sizeof($p['ot']); $i++) {
            $wheres .= "hTeamName.abr = '{$p['ot'][$i]}' OR aTeamName.abr = '{$p['ot'][$i]}'";

            if (($i + 1) < sizeof($p['ot'])) {
              $wheres .= " OR ";
            }
          }
          $wheres .= ") ";
        }
      }

      if (isset($p['m'])) {
        $wheres .= "AND (";
        for ($i = 0; $i < sizeof($p['m']); $i++) {
          $wheres .= "mapSlug.slug = '{$p['m'][$i]}'";
          
          if (($i + 1) < sizeof($p['m'])) {
            $wheres .= " OR ";
          }
        }
        $wheres .= ") ";
      }

      if (isset($p['p'])) {
        $wheres .= "AND (";
        for ($i = 0; $i < sizeof($p['p']); $i++) {
          $wheres .= "patchName.slug = '{$p['p'][$i]}'";
          
          if (($i + 1) < sizeof($p['p'])) {
            $wheres .= " OR ";
          }
        }
        $wheres .= ") ";
      }

      if (isset($p['hb'])) {
        $wheres .= "AND (";
        for ($i = 0; $i < sizeof($p['hb']); $i++) {
          $wheres .= "champB0.slug = '{$p['hb'][$i]}' OR champB2.slug = '{$p['hb'][$i]}'";
          
          if (($i + 1) < sizeof($p['hb'])) {
            $wheres .= " AND ";
          }
        }
        $wheres .= ") ";
      }

      if (isset($p['hp'])) {
        $wheres .= "AND (";
        for ($i = 0; $i < sizeof($p['hp']); $i++) {
          $wheres .= "(champP0.slug = '{$p['hp'][$i]}' OR champP3.slug = '{$p['hp'][$i]}'
          OR champP4.slug = '{$p['hp'][$i]}' OR champP7.slug = '{$p['hp'][$i]}'
          OR champP8.slug = '{$p['hp'][$i]}')";
          
          if (($i + 1) < sizeof($p['hp'])) {
            $wheres .= " AND ";
          }
        }
        $wheres .= ") ";
      }

      if (isset($p['ab'])) {
        $wheres .= "AND (";
        for ($i = 0; $i < sizeof($p['ab']); $i++) {
          $wheres .= "champB1.slug = '{$p['ab'][$i]}' OR champB3.slug = '{$p['ab'][$i]}'";
          
          if (($i + 1) < sizeof($p['ab'])) {
            $wheres .= " AND ";
          }
        }
        $wheres .= ") ";
      }

      if (isset($p['ap'])) {
        $wheres .= "AND (";
        for ($i = 0; $i < sizeof($p['ap']); $i++) {
          $wheres .= "(champP1.slug = '{$p['ap'][$i]}' OR champP2.slug = '{$p['ap'][$i]}'
          OR champP5.slug = '{$p['ap'][$i]}' OR champP6.slug = '{$p['ap'][$i]}'
          OR champP9.slug = '{$p['ap'][$i]}')";
          
          if (($i + 1) < sizeof($p['ap'])) {
            $wheres .= " AND ";
          }
        }
        $wheres .= ") ";
      }
    }
    //array_push($wheres, array('lGames.user_id','=','1'));

    return Capsule::table('lGames')
      ->select('lGames.id', 'lGames.ingame_id', 'lGames.pw', 'lGames.winner', 'lGames.score',
        'hTeamName.abr AS hTeamName', 'aTeamName.abr AS aTeamName',
        'mapSlug.slug AS mapSlug', 'mapName.name AS mapName',
        'patchName.slug AS patchName', 'matchType.name AS matchType',
        'champB0.slug AS champB0', 'champBR0.name AS champBR0',
        'champB1.slug AS champB1', 'champBR1.name AS champBR1',
        'champB2.slug AS champB2', 'champBR2.name AS champBR2',
        'champB3.slug AS champB3', 'champBR3.name AS champBR3',
        'champP0.slug AS champP0', 'champPR0.name AS champPR0',
        'champP1.slug AS champP1', 'champPR1.name AS champPR1',
        'champP2.slug AS champP2', 'champPR2.name AS champPR2',
        'champP3.slug AS champP3', 'champPR3.name AS champPR3',
        'champP4.slug AS champP4', 'champPR4.name AS champPR4',
        'champP5.slug AS champP5', 'champPR5.name AS champPR5',
        'champP6.slug AS champP6', 'champPR6.name AS champPR6',
        'champP7.slug AS champP7', 'champPR7.name AS champPR7',
        'champP8.slug AS champP8', 'champPR8.name AS champPR8',
        'champP9.slug AS champP9', 'champPR9.name AS champPR9',
        'player0.slug AS player0', 'playerN0.name AS playerN0',
        'player1.slug AS player1', 'playerN1.name AS playerN1',
        'player2.slug AS player2', 'playerN2.name AS playerN2',
        'player3.slug AS player3', 'playerN3.name AS playerN3',
        'player4.slug AS player4', 'playerN4.name AS playerN4',
        'player5.slug AS player5', 'playerN5.name AS playerN5',
        'player6.slug AS player6', 'playerN6.name AS playerN6',
        'player7.slug AS player7', 'playerN7.name AS playerN7',
        'player8.slug AS player8', 'playerN8.name AS playerN8',
        'player9.slug AS player9', 'playerN9.name AS playerN9',
        Capsule::raw('DATE_FORMAT(lGames.created_at, "%c/%d/%Y") AS created_atF')
      )
      ->leftJoin('lTeams AS hTeamName', 'lGames.home', '=', 'hTeamName.id')
      ->leftJoin('lTeams AS aTeamName', 'lGames.away', '=', 'aTeamName.id')
      ->leftJoin('lMaps AS mapSlug', 'lGames.map', '=', 'mapSlug.id')
      ->leftJoin('lMaps AS mapName', 'lGames.map', '=', 'mapName.id')
      ->leftJoin('lPatches AS patchName', 'lGames.lPatch_id', '=', 'patchName.id')
      ->leftJoin('lMatchTypes AS matchType', 'lGames.matchType', '=', 'matchType.id')
      ->leftJoin('lChampions AS champB0', 'lGames.b0', '=', 'champB0.id')
      ->leftJoin('lRoles AS champBR0', 'champB0.lRole_id', '=', 'champBR0.id')
      ->leftJoin('lChampions AS champB1', 'lGames.b1', '=', 'champB1.id')
      ->leftJoin('lRoles AS champBR1', 'champB1.lRole_id', '=', 'champBR1.id')
      ->leftJoin('lChampions AS champB2', 'lGames.b2', '=', 'champB2.id')
      ->leftJoin('lRoles AS champBR2', 'champB2.lRole_id', '=', 'champBR2.id')
      ->leftJoin('lChampions AS champB3', 'lGames.b3', '=', 'champB3.id')
      ->leftJoin('lRoles AS champBR3', 'champB3.lRole_id', '=', 'champBR3.id')
      ->leftJoin('lChampions AS champP0', 'lGames.p0', '=', 'champP0.id')
      ->leftJoin('lRoles AS champPR0', 'champP0.lRole_id', '=', 'champPR0.id')
      ->leftJoin('lChampions AS champP1', 'lGames.p1', '=', 'champP1.id')
      ->leftJoin('lRoles AS champPR1', 'champP1.lRole_id', '=', 'champPR1.id')
      ->leftJoin('lChampions AS champP2', 'lGames.p2', '=', 'champP2.id')
      ->leftJoin('lRoles AS champPR2', 'champP2.lRole_id', '=', 'champPR2.id')
      ->leftJoin('lChampions AS champP3', 'lGames.p3', '=', 'champP3.id')
      ->leftJoin('lRoles AS champPR3', 'champP3.lRole_id', '=', 'champPR3.id')
      ->leftJoin('lChampions AS champP4', 'lGames.p4', '=', 'champP4.id')
      ->leftJoin('lRoles AS champPR4', 'champP4.lRole_id', '=', 'champPR4.id')
      ->leftJoin('lChampions AS champP5', 'lGames.p5', '=', 'champP5.id')
      ->leftJoin('lRoles AS champPR5', 'champP5.lRole_id', '=', 'champPR5.id')
      ->leftJoin('lChampions AS champP6', 'lGames.p6', '=', 'champP6.id')
      ->leftJoin('lRoles AS champPR6', 'champP6.lRole_id', '=', 'champPR6.id')
      ->leftJoin('lChampions AS champP7', 'lGames.p7', '=', 'champP7.id')
      ->leftJoin('lRoles AS champPR7', 'champP7.lRole_id', '=', 'champPR7.id')
      ->leftJoin('lChampions AS champP8', 'lGames.p8', '=', 'champP8.id')
      ->leftJoin('lRoles AS champPR8', 'champP8.lRole_id', '=', 'champPR8.id')
      ->leftJoin('lChampions AS champP9', 'lGames.p9', '=', 'champP9.id')
      ->leftJoin('lRoles AS champPR9', 'champP9.lRole_id', '=', 'champPR9.id')
      ->leftJoin('lPlayers AS player0', 'lGames.player0', '=', 'player0.id')
      ->leftJoin('lPlayers AS player1', 'lGames.player1', '=', 'player1.id')
      ->leftJoin('lPlayers AS player2', 'lGames.player2', '=', 'player2.id')
      ->leftJoin('lPlayers AS player3', 'lGames.player3', '=', 'player3.id')
      ->leftJoin('lPlayers AS player4', 'lGames.player4', '=', 'player4.id')
      ->leftJoin('lPlayers AS player5', 'lGames.player5', '=', 'player5.id')
      ->leftJoin('lPlayers AS player6', 'lGames.player6', '=', 'player6.id')
      ->leftJoin('lPlayers AS player7', 'lGames.player7', '=', 'player7.id')
      ->leftJoin('lPlayers AS player8', 'lGames.player8', '=', 'player8.id')
      ->leftJoin('lPlayers AS player9', 'lGames.player9', '=', 'player9.id')
      ->leftJoin('lPlayers AS playerN0', 'lGames.player0', '=', 'playerN0.id')
      ->leftJoin('lPlayers AS playerN1', 'lGames.player1', '=', 'playerN1.id')
      ->leftJoin('lPlayers AS playerN2', 'lGames.player2', '=', 'playerN2.id')
      ->leftJoin('lPlayers AS playerN3', 'lGames.player3', '=', 'playerN3.id')
      ->leftJoin('lPlayers AS playerN4', 'lGames.player4', '=', 'playerN4.id')
      ->leftJoin('lPlayers AS playerN5', 'lGames.player5', '=', 'playerN5.id')
      ->leftJoin('lPlayers AS playerN6', 'lGames.player6', '=', 'playerN6.id')
      ->leftJoin('lPlayers AS playerN7', 'lGames.player7', '=', 'playerN7.id')
      ->leftJoin('lPlayers AS playerN8', 'lGames.player8', '=', 'playerN8.id')
      ->leftJoin('lPlayers AS playerN9', 'lGames.player9', '=', 'playerN9.id')
      ->whereRaw($wheres)
      ->orderBy('lGames.id', 'DESC')
      ->get();
  }
}