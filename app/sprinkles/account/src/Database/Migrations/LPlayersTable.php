<?php

namespace UserFrosting\Sprinkle\Account\Database\Migrations;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use UserFrosting\System\Bakery\Migration;

class LPlayersTable extends Migration {
  public function up() {
    if (!$this->schema->hasTable('lPlayers')) {
      $this->schema->create('lPlayers', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id')->unsigned()->comment("The id of the user.");
        $table->string('name', 36);
        $table->string('slug', 36);
        $table->integer('team')->unsigned()->comment("The id of the team.");

        $table->engine = 'InnoDB';
        $table->collation = 'utf8_unicode_ci';
        $table->charset = 'utf8';
        $table->index('user_id');
        $table->index('team');
      });
    }
  }

  public function down() {
    $this->schema->drop('lPlayers');
  }
}