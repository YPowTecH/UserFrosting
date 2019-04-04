<?php

namespace UserFrosting\Sprinkle\Account\Database\Migrations;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use UserFrosting\System\Bakery\Migration;

class LGamesTable extends Migration {
  public function up() {
    if (!$this->schema->hasTable('lGames')) {
      $this->schema->create('lGames', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id')->unsigned()->comment("The id of the user");
        $table->integer('lTitle_id')->unsigned()->comment("The id of the title");
        $table->integer('lPatch_id')->unsigned()->comment("The id of the patch");
        $table->string('ingame_id', 16);
        $table->timestamp('created_at');
        $table->string('pw', 36);
        $table->integer('map')->unsigned()->comment("The id of the map");
        $table->string('winner', 1);
        $table->string('score', 5);
        $table->integer('home')->unsigned()->comment("The id of the home team");
        $table->integer('away')->unsigned()->comment("The id of the away team");
        $table->integer('b0')->unsigned()->comment("The id of the 1st ban champion");
        $table->integer('b1')->unsigned()->comment("The id of the 2st ban champion");
        $table->integer('b2')->unsigned()->comment("The id of the 2st ban champion");
        $table->integer('b3')->unsigned()->comment("The id of the 2st ban champion");

        $table->engine = 'InnoDB';
        $table->collation = 'utf8_unicode_ci';
        $table->charset = 'utf8';
        $table->index('user_id');
        $table->index('lTitle_id');
        $table->index('lPatch_id');
        $table->index('map');
        $table->index('home');
        $table->index('away');
        $table->index('b0');
        $table->index('b1');
        $table->index('b2');
        $table->index('b3');
      });
    }
  }

  public function down() {
    $this->schema->drop('lGames');
  }
}