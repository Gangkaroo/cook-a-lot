<template>
    <ckeditor
        :editor="editor"
        :config="editorConfig"
        v-model="content">
    </ckeditor>
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
            intialContent: {
                type: String,
                default: ''
            },
            placeholder: String,
            eventBus: Object
        },
        data: function() {
            return {
                content: this.initialContent,
                editor: InlineEditor,
                editorConfig: {
                    placeholder: this.placeholder
                }
            }
        },
        computed: {
            isCorrect: function() {
                return !this.hasError && this.touched;
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
            // Update the model of the form
            valueUpdated: function() {
                this.eventBus.$emit('inputUpdate', {name: this.name, value: this.value});
            }
        },
        mounted() {
            // Listen for server or validation errors
            this.eventBus.$on(this.name + 'Error', this.setError);
            CKEDITOR.config.tabIndex = this.index;

            // Focus input if it is the first input
            if (this.index === 1) {
                this.$nextTick(() => {
                    this.focusInput();
                });
            }
        }
    }
</script>

