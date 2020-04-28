
export default class Recipe {
    constructor(data = {}) {
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
}
