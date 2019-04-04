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
 * Filter Class
 *
 * Represents a Filter object as stored in the database.
 *
 * @author PowTecH
 * @property int id
 * @property string title
 */
class LFilter extends Model
{
  /**
   * @var string The name of the table for the current model.
   */
  protected $table = 'lFilters';

  /**
   * Fields that should be mass-assignable when creating a new User.
   *
   * @var string[]
   */
  protected $fillable = [
    'title'
  ];

  /**
   * @var bool Enable timestamps for this class.
   */
  public $timestamps = true;
}