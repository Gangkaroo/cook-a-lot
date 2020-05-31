<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('user_id')->constrained();
            $table->string('title', 255);
            $table->text('description');
            $table->time('prep_time');
            $table->time('cook_time');
            $table->float('rating', 10, 9)->comment('The accumulated rating of the recipe');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
