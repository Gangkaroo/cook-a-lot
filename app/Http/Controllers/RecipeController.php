<?php

namespace App\Http\Controllers;

use App\Ingredient;
use App\Recipe;
use App\Tag;
use App\RecipeSource;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    /**
     * RecipesController constructor. Make sure that
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Returns the details of a single recipe
     * @param int $recipeId
     * @return array The recipe details
     */
    public function getRecipe($recipeId)
    {
        return Recipe::find($recipeId);
    }

    /**
     * Return all recipes in the database
     * @return Recipe[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getRecipes()
    {
        return Recipe::all();
    }

    /**
     * Create a recipe
     * @param Request $request
     */
    public function store(Request $request)
    {
        $recipe = new Recipe($this->validateRecipe($request));
        $recipe->description = $request->input('description') ?? '';
        $recipe->prep_time = $request->input("prep_time") ?? '0:00';
        $recipe->cook_time = $request->input("cook_time") ?? '0:00';
        $recipe->rating = 0;
        $recipe->user_id = auth()->id();

        $recipe->save();
    }

    public function update(Request $request)
    {
        $recipe = Recipe::find(request("id"));
        $this->validateRecipe($request);


        $recipe->title = request("title");
        $recipe->description = request("description");
        $recipe->prep_time = request("prep_time");
        $recipe->cook_time = request("cook_time");
        $recipe->rating = 0;

        $recipe->save();

        // Parse ingredients
        $ingredients = request('ingredients');
        $ids = [];
        foreach ($ingredients as $ingredientDescription) {
            // TODO: store ingredients in array with ID and description. ID is 0 if it
            if (empty($ingredientDescription['id'])) {
                $ingredient = new Ingredient;
                $ingredient->parse($ingredientDescription);
                if ($ingredient->save()) {
                    $ids[] = $ingredient->id;
                }
            }
        }

        // Remove all previous ingredients
        $recipe->ingredients()->detach();
        $recipe->ingredients()->attach($ids);

        return redirect('/recipes/' . $recipe->id);
    }

    private function validateRecipe(Request $request)
    {
        return $this->validate($request, [
            'title' => 'required|min:3|max:255',
            /*'prep_time' => 'min:4|max:8',
            'cook_time' => 'min:4|max:8'*/
        ]);
    }
}
