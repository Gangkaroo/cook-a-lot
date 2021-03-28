<?php

namespace App\Http\Controllers;

use App\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    /**
     * RecipesController constructor. Make sure that
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Search for an existing ingredient
     * @param string $searchTerm
     * @return string[]
     */
    public function searchIngredients(string $searchTerm)
    {
        $ingredients = Ingredient::where('label', 'LIKE', "{$searchTerm}%")->get();
        return $ingredients;
    }

    /**
     * Save a new ingredient
     * @param Request $request The request containing the ingredient details
     */
    public function store(Request $request)
    {

    }
}
