<?php

namespace UserFrosting\Sprinkle\Account\Database\Migrations;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use UserFrosting\System\Bakery\Migration;

class LChampionsTable extends Migration
{
    public function up()
    {
        if (!$this->schema->hasTable('lChampions')) {
            $this->schema->create('lChampions', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('lTitle_id')->unsigned()->comment("The id of the title.");
                $table->integer('lRole_id')->unsigned()->comment("The id of the title.");
                $table->string('slug', 36);
                $table->string('name', 36);

                $table->engine = 'InnoDB';
                $table->collation = 'utf8_unicode_ci';
                $table->charset = 'utf8';
                $table->unique('slug');
                $table->index('slug');
                $table->unique('name');
                $table->index('name');
            });
        }
    }

    public function down()
    {
        $this->schema->drop('lChampions');
    }
}