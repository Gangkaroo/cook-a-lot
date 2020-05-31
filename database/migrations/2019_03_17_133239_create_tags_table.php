<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table)
        {
            $table->id('id');
            $table->string('name', 100);
            $table->bigInteger('parent_id')
                ->unsigned()
                ->nullable()
                ->comment('Required to store a tag hierarchy');
            $table->timestamps();
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->foreign('parent_id')
                ->references('id')
                ->on('tags');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tags');
    }
}
