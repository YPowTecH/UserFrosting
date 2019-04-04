<?php

namespace UserFrosting\Sprinkle\Account\Database\Migrations;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use UserFrosting\System\Bakery\Migration;

class LMapsTable extends Migration {
  public function up() {
    if (!$this->schema->hasTable('lMaps')) {
      $this->schema->create('lMaps', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id')->unsigned()->comment("The id of the user.");
        $table->integer('lTitle_id')->unsigned()->comment("The id of the user.");
        $table->string('slug', 36);
        $table->string('name', 36);

        $table->engine = 'InnoDB';
        $table->collation = 'utf8_unicode_ci';
        $table->charset = 'utf8';
        $table->index('user_id');
        $table->index('lTitle_id');
      });
    }
  }

  public function down() {
    $this->schema->drop('lMaps');
  }
}