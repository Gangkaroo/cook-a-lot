<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecipeHasIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipe_has_ingredients', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('recipe_id')->unsigned()->comment('ID of the recipe the ingredient relates to');
            $table->integer('ingredient_id')->unsigned()->comment('ID of the ingredient required by the recipe');
            $table->integer('unit_id')->unsigned()->comment('ID of the unit of the ingredient');
            $table->float('amount')->comment('Indicates the amount with the given unit that is needed for an ingredient');

            $table->foreign('recipe_id')->references('id')->on('recipes');
            $table->foreign('ingredient_id')->references('id')->on('ingredients');
            $table->foreign('unit_id')->references('id')->on('units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipe_has_ingredients');
    }
}
