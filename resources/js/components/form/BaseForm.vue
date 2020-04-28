<template>
    <form @submitForm="submit">
        <base-form-row
            v-for="(field, index) in fields"
            :key="field.name"
            :field="field"
            :eventBus="eventBus"
            :index="++index">
        </base-form-row>
    </form>
</template>

<script>
    import Form from '../../classes/Form';
    import BaseFormRow from './BaseFormRow';

    export default {
        name: "BaseForm.vue",
        components: { BaseFormRow },
        props: {
            eventBus: {
                type: Object,
                required: true
            },
            fields: {
                type: Array,
                required: true,
                validator: (fields) => {
                    return fields.length;
                }
            },
            submitHandler: {
                type: Function
            },
            url: {
                type: String
            }
        },
        data: () => {
            return {
                form: null
            }
        },
        computed: {
            // Return the name of the first input field. Required to focus first input
            firstFieldName: function() {
                return this.fields[0].name;
            },
            // Build form data based on submitted fields
            formData: function() {
                let fieldData = {};
                this.fields.map((field) => {
                    fieldData[field.name] = field.value;
                });
                return fieldData;
            }
        },
        methods: {
            // Return the validation criteria and messages of a field if they exist
            getValidation: function(name) {
                let hasError = false;
                let validation = [{}, {}];
                this.$props.fields.forEach(function(field) {
                    if (hasError) {
                        return;
                    }
                    if (field.name === name && typeof field.validation === 'object') {
                        let messages = {};
                        if (typeof field.errorMessages === 'object' && Object.keys(field.errorMessages).length) {
                            messages = field.errorMessages;
                        }
                        validation = [field.validation, messages];
                        hasError = true;
                    }
                });
                return validation;
            },
            // Validate and submit the form
            submit: function() {
                if (!this.validateForm()) {
                    return;
                }
                // Check if there is a custom submit method
                if (this.submitHandler) {
                    this.submitHandler(this.form.data());
                    return;
                }

                // Use the default submit method
                this.form.post(this.url)
                    .then(function() {
                        this.eventBus.$emit('submitSuccess');
                    }.bind(this))
                    .catch(function() {
                        if (this.form.errors.any()) {
                            for (let errorName in this.form.errors.errors) {
                                this.eventBus.$emit(errorName + 'Error');
                            }
                        }
                        this.eventBus.$emit('submitError');
                    }.bind(this));
            },
            // Update the model in the form
            updateModel: function(field) {
                this.form[field.name] = field.value;
            },
            // Check if all input fields are valid
            validateForm: function() {
                if (this.$v.$invalid) {
                    this.$props.fields.forEach(function(field) {
                        if (!this.validateInput(field.name)) {
                            return false;
                        }
                    }.bind(this));
                    return false;
                }

                return true;
            },
            // Validate a single input after blurring
            validateInput: function(name) {
                if (this.$v.form[name].$invalid) {
                    this.form.errors[name] = [];
                    const [validations, messages] = this.getValidation(name);
                    let message = '';
                    Object.keys(validations).forEach(function (validation) {
                        if (this.$v.form[name][validation] === false) {
                            if (typeof messages[validation] === 'string') {
                                message = messages[validation]
                            } else {
                                message = this.$t('default_input_error');
                            }
                        }
                    }.bind(this));
                    this.form.errors.set(name, message);
                    this.eventBus.$emit(name + 'Error', message);

                    return false;
                }

                return true;
            }
        },
        // Focus first field in the form after mounting
        mounted() {
            this.form = new Form(this.formData);
            this.eventBus.$on('submitForm', this.submit);
            this.eventBus.$on('inputUpdate', this.updateModel);
            this.eventBus.$on('fieldBlurred', this.validateInput);
        },
        // Dynamically initialize the validations based on validation objects of the input
        validations() {
            let validations = {form: {}};
            this.$props.fields.forEach(field => {
                if (typeof field.validation === 'object' && Object.keys(field.validation)) {
                    validations.form[field.name] = field.validation;
                }
            });
            return validations;
        }
    }
</script>
