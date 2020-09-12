<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Login and registration routes */
Route::middleware('api')->prefix('auth')->group(function() {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
    Route::get('refresh', 'AuthController@refresh');
    Route::post('register', 'AuthController@register');
});

// Everything related to recipes
Route::middleware('api')->prefix('api')->group(function() {
    Route::get('recipes', 'RecipeController@getRecipes');
    Route::get('recipe/{recipeId}', 'RecipeController@getRecipe');
    Route::get('ingredients/search/{ingredientName}', 'RecipeController@searchIngredients');
    Route::delete('recipe/{recipeId}', 'RecipeController@deleteRecipe');
    Route::post('recipes', 'RecipeController@store');
});
