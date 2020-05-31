<template>
    <div class="recipe-list">
        <recipe-card
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
        ></recipe-card>
    </div>
</template>

<script>
    import RecipeCard from "./RecipeCard";

    export default {
        name: "RecipeList",
        components: {
            RecipeCard
        },

        data: function() {
            return {
                recipes: []
            }
        },

        mounted() {
            axios.get('/recipe-list')
                .then(response => {
                    if (response.data.length) {
                        this.recipes = response.data;
                    }
                });
        }
    }
</script>

<style>
    .recipe-list {
        display: flex;
        flex-wrap: wrap;
    }
</style>
