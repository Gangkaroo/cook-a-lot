<template>
    <span>
        <input
            :type="inputType"
            :ref="name"
            :id="name"
            class="input"
            :class="{'is-danger': hasError}"
            :placeholder="placeholder"
            :tabindex="index"
            v-model="value"
            @keyup="valueUpdated"
            @keyup.enter="submitValue"
            @blur="fieldBlurred">
        <span v-if="hasIcon" class="icon is-small is-left">
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
        name: "BaseInput",
        props: {
            index: {
                type: Number,
                required: true
            },
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
            hasIcon: function() {
                return typeof this.iconName !== 'undefined' && this.iconName.length;
            },
            isCorrect: function() {
                return !this.hasError && this.touched;
            },

            // Return the correct input type
            inputType: function() {
                if (this.type === 'password' || this.type === 'hidden') {
                    return this.type;
                } else {
                    return 'text';
                }
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

            // Focus the first input
            focusInput() {
                this.$refs[this.name].focus();
            },

            // An error has been recorded
            setError: function() {
                this.hasError = true;
            },

            // Submit the form
            submitValue: function() {
                this.eventBus.$emit('submitForm');
            },

            // Update the input value
            updateValue: function(newValue) {
                this.value = newValue;
                // Notify the form of an update
                this.valueUpdated();
            },

            // Update the model of the form
            valueUpdated: function() {
                this.eventBus.$emit('inputUpdate', {name: this.name, value: this.value});
            }
        },
        mounted() {
            // Listen for server or validation errors
            this.eventBus.$on(this.name + 'Error', this.setError);
            // Listen for parent model changes
            this.eventBus.$on('update:' + this.name, this.updateValue);

            // Focus input if it is the first input
            if (this.index === 1) {
                this.$nextTick(() => {
                    this.focusInput();
                });
            }
        }
    }
</script>

