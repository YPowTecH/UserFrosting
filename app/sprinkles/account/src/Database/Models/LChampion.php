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
 * LChampion Class
 *
 * Represents a lChampion object as stored in the database.
 *
 * @author PowTecH
 * @property int id
 * @property string title
 */
class LChampion extends Model
{
  /**
   * @var string The name of the table for the current model.
   */
  protected $table = 'lChampions';

  /**
   * Fields that should be mass-assignable when creating a new User.
   *
   * @var string[]
   */
  protected $fillable = [
      'lTitle_id',
      'lRole_id',
      'slug',
      'name',
  ];

  /**
   * @var bool Enable timestamps for this class.
   */
  public $timestamps = true;

  /**
   * Return this user's group.
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function LRole() {
    /** @var UserFrosting\Sprinkle\Core\Util\ClassMapper $classMapper */
    $classMapper = static::$ci->classMapper;

    return $this->belongsTo($classMapper->getClassMapping('LRole'), 'lRole_id');
  }
}