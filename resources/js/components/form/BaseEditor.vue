<template>
    <div :id="this.name">
        <ckeditor
            :tabindex="this.index"
            :editor="editor"
            :config="editorConfig"
            v-model="value"
            @blur="fieldBlurred()"
        ></ckeditor>
    </div>
</template>

<script>
    import InlineEditor from '@ckeditor/ckeditor5-build-inline';

    export default {
        name: "BaseEditor",
        props: {
            index: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            placeholder: String,
            eventBus: Object
        },
        data: function() {
            return {
                editor: InlineEditor,
                editorConfig: {
                    placeholder: this.placeholder
                },
                hasError: false,
                touched: false,
                value: ''
            }
        },
        computed: {
            isCorrect: function() {
                return !this.hasError && this.touched;
            }
        },
        methods: {
            // Update the model on blur
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

            // Update the input value
            updateValue: function(newValue) {
                this.value = newValue;
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

