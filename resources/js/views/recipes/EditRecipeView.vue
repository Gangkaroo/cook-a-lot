<template>
    <div class="content">
        <h1 v-if="isNew" class="title is-4">{{$t('new_recipe')}}</h1>
        <h1 v-if="!isNew" class="title">{{$t('edit_recipe')}}</h1>
        <div class="columns">
            <div class="column">
                <base-form
                    :fields="fields"
                    :event-bus="eventBus"
                    url="/recipes"
                ></base-form>
            </div>
            <div class="column">
            </div>
        </div>
        <div class="buttons">
            <button class="button is-primary" @click="save()">
                {{$t('save')}}
            </button>
            <button class="button is-light" @click="cancelEdit()">
                {{$t('cancel')}}
            </button>
        </div>
    </div>
</template>

<script>
    import {minLength, required} from "vuelidate/lib/validators";
    import Recipe from "../../classes/Recipe";

    export default {
        name: "EditRecipeView",
        data: function() {
            return {
                recipe: new Recipe(),
                fields: [
                    {
                        name: 'title',
                        value: '',
                        placeholder: this.$t('title'),
                        type: 'input',
                        validation: {
                            required,
                            minLength: minLength(3)
                        },
                        errorMessages: {
                            required: this.$t('title_required'),
                            minLength: this.$t('title_required')
                        }
                    },
                    {
                        name: 'description',
                        placeholder: this.$t('description'),
                        value: '',
                        type: 'editor'
                    },
                    /*{
                        title: this.$t('ingredient_list'),
                        type: 'content'
                    },*/
                    {
                        name: 'ingredients',
                        searchHandler: this.searchIngredient,
                        placeholder: this.$t('add_ingredient'),
                        value: '',
                        addOnButton: 'plus',
                        addOnButtonHandler: this.addIngredient,
                        type: 'autocomplete'
                    }
                ],
                eventBus: new Vue()
            }
        },

        computed: {
            isNew() {
                return parseInt(this.recipeId) === 0;
            },
            recipeId() {
                return this.$route.params.recipeId;
            }
        },

        methods: {
            addIngredient: function() {
                if (this.recipe.isValidIngredient(this.newIngredient)) {
                    this.recipe.addIngredient(this.newIngredient);
                }
            },

            // Return to the recipes overview
            cancelEdit: function() {
                this.$router.push("/recipes")
            },

            // search for an existing ingredient
            searchIngredient: function(searchTerm) {
                console.log(searchTerm);
            },

            // Initiate the recipe submission
            save() {
                this.eventBus.$emit('submitForm');
            }
        }
    }
</script>
