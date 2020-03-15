<template>
    <div class="content">
        <h1 v-if="!recipeId" class="title is-4">{{$t('new_recipe')}}</h1>
        <h1 v-if="recipeId" class="title">{{$t('edit_recipe')}}</h1>
        <div class="columns">
            <div class="column">
                <base-form :fields="fields" :event-bus="eventBus"></base-form>
            </div>
            <div class="column">
            </div>
        </div>
    </div>
</template>

<script>
    import {minLength, required} from "vuelidate/lib/validators";

    export default {
        name: "EditRecipeView",
        props: {
            recipeId: {
                type: Number,
                required: true
            }
        },
        data: function() {
            return {
                fields: [
                    {
                        name: 'title',
                        label: this.$t('title'),
                        value: '',
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
                        label: this.$t('description'),
                        placeholder: this.$t('description'),
                        value: '',
                        type: 'editor'
                    }
                ],
                eventBus: new Vue()
            }
        }
    }
</script>
