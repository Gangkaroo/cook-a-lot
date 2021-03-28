<template>
    <div class="ingredient-list">
        <ul>
            <li v-for="(ingredient, index) in ingredients">
                <span class="icon-text"><span>{{ ingredient }}</span
                ><span><span class="mdi md-18 md-dark mdi-delete"></span></span></span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "IngredientList",
    props: {
        eventBus: {
            type: Object,
            required: true
        },
        ingredients: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },

    methods: {
        addIngredient: function(ingredientName) {
            console.log(ingredientName);
            this.ingredients.push(ingredientName);
        }
    },

    mounted() {
        this.eventBus.$on('addIngredient', this.addIngredient);
    }
}
</script>

<style>

</style>
