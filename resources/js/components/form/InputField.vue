<template>
    <span>
        <input :type="inputType" :ref="relName" :id="name" class="input" v-bind:class="{'is-danger': hasError}"
               :placeholder="placeholder" v-model="value" @keyup="valueUpdated"
               @keyup.enter="submitValue" @blur="fieldBlurred">
        <span class="icon is-small is-left">
            <i class="material-icons md-18">
                {{iconName}}
            </i>
        </span>
        <span v-if="isCorrect" class="icon is-small is-right">
            <i class="material-icons md-18">
                done
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
                hasError: false,
                touched: false,
                value: ''
            }
        },
        computed: {
            isCorrect: function() {
                return !this.hasError && this.touched;
            },
            inputType: function() {
                return this.type === 'password' ? 'password': 'text';
            },
            relName: function() {
                return this.name + "Input";
            }
        },
        methods: {
            fieldBlurred: function() {
                // First set the error to false. If validation fails it will be set to true shortly after
                this.hasError = false;
                this.touched = true;
                this.valueUpdated();
                this.eventBus.$emit('fieldBlurred', this.name);
            },
            // An error has been recorded
            setError: function() {
                this.hasError = true;
            },
            // Submit the form
            submitValue: function() {
                this.eventBus.$emit('submitForm');
            },
            // Update the model of the form
            valueUpdated: function() {
                this.eventBus.$emit('inputUpdate', {name: this.name, value: this.value});
            }
        },
        mounted() {
            // Listen for server or validation errors
            this.eventBus.$on(this.name + 'Error', this.setError);
        }
    }
</script>

