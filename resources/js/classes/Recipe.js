import Ingredient from "./Ingredient";

export default class Recipe {
    constructor(data = {}) {
        this.recipeId = data.id || 0;
        this.title = data.title || '';
        this.description = data.description || '';
        this.ingredients = data.ingredients || [];
    }

    addIngredient(input) {
        const ingredient = new Ingredient(input);
        if (ingredient.isValid) {
            this.ingredients.push(ingredient);
            return true;
        } else {
            return false;
        }
    }

    // Need to improve this over time
    isValidIngredient(input) {
        return input.length > 1;
    }

    // Parse the input and return reference to the current instance
    parseInput(input) {
        this.title = input.title || '';
        this.description = input.description || '';

        return this;
    }

    store() {

    }
}
