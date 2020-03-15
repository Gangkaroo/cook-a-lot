<template>
    <div class="recipe-list">
        <recipe-card></recipe-card>
        <recipe-card></recipe-card>
        <recipe-card></recipe-card>
        <recipe-card></recipe-card>
    </div>
</template>

<script>
    import RecipeCard from "./RecipeCard";

    export default {
        name: "RecipeList",
        components: {
            RecipeCard
        }
    }
</script>

<style>
    .recipe-list {
        display: flex;
        flex-wrap: wrap;
    }
</style>
