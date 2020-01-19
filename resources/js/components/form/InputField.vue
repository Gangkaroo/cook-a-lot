<template>
    <span>
        <input :type="inputType" :ref="relName" :id="name" class="input"
               :placeholder="placeholder" v-model="value" @keyup="valueUpdated"
               @keyup.enter="submitValue">
        <span class="icon is-small is-left">
            <i class="material-icons md-18">
                {{iconName}}
            </i>
        </span>
    </span>
</template>

<script>
    export default {
        name: "InputField.vue",
        props: {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String
            },
            placeholder: String,
            iconName: String,
            eventBus: Object
        },
        data: function() {
            return {
                value: ''
            }
        },
        computed: {
            inputType: function() {
                return this.type === 'password' ? 'password': 'text';
            },
            relName: function() {
                return this.name + "Input";
            }
        },
        methods: {
            // Submit the form
            submitValue: function() {
                this.eventBus.$emit('submitForm');
            },
            // Update the model of the form
            valueUpdated: function() {
                this.eventBus.$emit('inputUpdate', {name: this.name, value: this.value});
            }
        }
    }
</script>

