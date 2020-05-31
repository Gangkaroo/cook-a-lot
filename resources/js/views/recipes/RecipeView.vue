<template>
    <div>
        <div class="list-head">
            <recipe-search></recipe-search>
            <div class="buttons">
                <router-link to="/recipe/0" tag="button" class="button is-light">
                    <span class="icon is-small">
                        <i class="material-icons md-18">
                            restaurant
                        </i>
                    </span>
                    <span class="icon-label">
                        {{$t('new_recipe')}}
                    </span>
                </router-link>
            </div>
        </div>
        <recipe-list></recipe-list>
    </div>
</template>

<script>
    import RecipeList from '../../components/recipes/RecipeList';
    import EditRecipeView from "./EditRecipeView";
    import RecipeSearch from "../../components/recipes/RecipeSearch";

    export default {
        name: "RecipeView",
        components: {
            RecipeSearch,
            EditRecipeView,
            RecipeList
        },
        data: function() {
            return {
                eventBus: new Vue()
            }
        }
    }
</script>

<style>
    .list-head {
        display: flex;
    }
</style>
