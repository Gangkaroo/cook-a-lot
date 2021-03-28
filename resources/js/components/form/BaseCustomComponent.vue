<template>
    <div class="form-content">
        <component :is="component" :event-bus="eventBus" v-bind="properties"></component>
    </div>
</template>
<script>
import IngredientList from "../../components/recipes/IngredientList";
export default {
    name: "BaseCustomComponent",
    components: {
        IngredientList
    },
    props: {
        component: {
            type: String
        },
        eventBus: {
            type: Object,
            required: true
        },
        properties: {
            type: Object
        }
    }
}
</script>
