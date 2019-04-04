<?php

namespace UserFrosting\Sprinkle\Account\Database\Migrations;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use UserFrosting\System\Bakery\Migration;

class LRolesTable extends Migration {
  public function up() {
    if (!$this->schema->hasTable('lRoles')) {
      $this->schema->create('lRoles', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name', 36);

        $table->engine = 'InnoDB';
        $table->collation = 'utf8_unicode_ci';
        $table->charset = 'utf8';
      });
    }
  }

  public function down() {
    $this->schema->drop('lRoles');
  }
}