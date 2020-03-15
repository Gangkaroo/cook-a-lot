<template>
    <div>
        <transition name="fade">
            <div v-if="!isListView">
                <edit-recipe-view :recipe-id="editRecipeID"></edit-recipe-view>
                <div class="buttons">
                    <button class="button is-light" @click="cancelEdit()">
                        {{$t('cancel')}}
                    </button>
                </div>
            </div>
        </transition>
        <div v-if="isListView">
            <div class="list-head">
                <recipe-search></recipe-search>
                <div class="buttons">
                    <button class="button is-light" @click="editRecipe()">
                    <span class="icon is-small">
                        <i class="material-icons md-18">
                            restaurant
                        </i>
                    </span>
                        <span class="icon-label">
                        {{$t('new_recipe')}}
                    </span>
                    </button>
                </div>
            </div>
            <recipe-list></recipe-list>
        </div>
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
                editRecipeID: 0,
                eventBus: new Vue(),
                isListView: true
            }
        },
        methods: {
            cancelEdit: function() {
                this.isListView = true;
            },
            editRecipe: function(recipeID = 0) {
                this.isListView = false;
            }
        }
    }
</script>

<style>
    .list-head {
        display: flex;
    }
</style>
