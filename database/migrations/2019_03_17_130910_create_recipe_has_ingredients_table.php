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
            $table->id('id');
            $table->foreignId('recipe_id')->constrained()->comment('ID of the recipe the ingredient relates to');
            $table->foreignId('ingredient_id')->constrained()->comment('ID of the ingredient required by the recipe');
            $table->foreignId('unit_id')->constrained()->comment('ID of the unit of the ingredient');
            $table->float('amount')->comment('Indicates the amount with the given unit that is needed for an ingredient');
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
