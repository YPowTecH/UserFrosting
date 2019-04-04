<?php

namespace UserFrosting\Sprinkle\Account\Database\Migrations;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use UserFrosting\System\Bakery\Migration;

class LTeamsTable extends Migration {
  public function up() {
    if (!$this->schema->hasTable('lTeams')) {
      $this->schema->create('lTeams', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id')->unsigned()->comment("The id of the user.");
        $table->string('name', 36);
        $table->string('abr', 8);

        $table->engine = 'InnoDB';
        $table->collation = 'utf8_unicode_ci';
        $table->charset = 'utf8';
        $table->index('user_id');
      });
    }
  }

  public function down() {
    $this->schema->drop('lTeams');
  }
}