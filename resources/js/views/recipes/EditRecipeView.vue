<template>
    <div class="content">
        <h1 v-if="isNew" class="title is-4">{{$t('new_recipe')}}</h1>
        <h1 v-if="!isNew" class="title">{{$t('edit_recipe')}}</h1>
        <div class="columns">
            <div class="column">
                <base-form
                    :fields="fields"
                    :event-bus="eventBus"
                    url="/api/recipes"
                ></base-form>
            </div>
            <div class="column">
            </div>
        </div>
        <div class="level">
            <div class="level-left">
                <div class="buttons">
                    <button class="button is-primary" @click="save()">
                        {{$t('save')}}
                    </button>
                    <button class="button is-light" @click="cancelEdit()">
                        {{$t('back')}}
                    </button>
                </div>
            </div>
            <div v-if="recipeId" class="level-right">
                <button class="button is-danger" @click="confirmDelete()">
                    {{$t('delete')}}
                </button>
            </div>
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
                recipe: null,
                fields: [
                    {
                        name: 'recipeId',
                        value: 0,
                        type: 'hidden'
                    },
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
                return this.recipeId === 0;
            },
            recipeId() {
                return parseInt(this.$route.params.recipeId);
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
                this.$router.push("/recipes");
            },

            // Show the delete dialog
            confirmDelete: function() {
                this.$buefy.dialog.confirm({
                    title: this.$t('delete_recipe'),
                    message: this.$t('delete_recipe_message'),
                    confirmText: this.$t('delete'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: this.deleteRecipe
                })
            },

            // Delete the current recipe
            deleteRecipe: function() {
                axios.delete('/api/recipe/' + this.recipeId)
                    .then(response => {
                        this.$buefy.snackbar.open({
                            actionText: null,
                            message: '<span class="snack-icon"><i class="material-icons success">check</i>'
                                + this.$t('recipe_deleted') + '</span>',
                            type: 'is-success'
                        });
                        this.$router.push("/recipes");
                    });
            },

            // Load the recipe details
            loadRecipeDetails: function() {
                axios.get('/api/recipe/' + this.recipeId)
                    .then(response => {
                        if (typeof response.data.id !== 'undefined' && response.data.id === this.recipeId) {
                            this.recipe = new Recipe(response.data);
                            this.fields.forEach(field => {
                                this.eventBus.$emit('update:' + field.name, this.recipe[field.name]);
                            });
                        }
                    });
            },

            // search for an existing ingredient
            searchIngredient: function(searchTerm) {
                console.log(searchTerm);
                return axios.get('/api/ingredients/search/' + searchTerm);
            },

            // Initiate the recipe submission
            save() {
                this.eventBus.$emit('submitForm');
            },

            // Show success message and navigate back
            saveSuccessful() {
                this.$buefy.snackbar.open({
                    actionText: null,
                    message: '<span class="snack-icon"><i class="material-icons success">check</i>'
                        + this.$t('create_recipe_success') + '</span>',
                    type: 'is-success'
                });
                this.$router.push("/recipes");
            },

            // Show success message and navigate back
            updateSuccessful() {
                this.$buefy.snackbar.open({
                    actionText: null,
                    message: '<span class="snack-icon"><i class="material-icons success">check</i>'
                        + this.$t('update_recipe_success') + '</span>',
                    type: 'is-success'
                });
                this.$router.push("/recipes");
            }
        },

        mounted() {
            if (this.recipeId > 0) {
                this.loadRecipeDetails();
                this.eventBus.$on('submitSuccess', this.updateSuccessful);
            } else {
                this.eventBus.$on('submitSuccess', this.saveSuccessful);
            }
        }
    }
</script>
