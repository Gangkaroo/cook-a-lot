<template>
    <div class="control recipe-search has-icons-left has-icons-right">
        <base-input
            :index="1"
            :event-bus="eventBus"
            name="recipe_search"
            :placeholder="$t('recipe_search')"
            iconName="magnify">
        </base-input>
    </div>
</template>

<script>
    import BaseInput from "../../components/form/BaseInput";

    export default {
        name: "RecipeSearch",
        components: { BaseInput },
        data: function() {
            return {
                eventBus: new Vue()
            }
        }
    }
</script>

<style>
    .recipe-search {
        margin-right: 10px;
        width: 400px;
    }
</style>
