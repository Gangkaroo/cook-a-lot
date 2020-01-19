<template>
    <form @submitForm="submit">
        <input-row v-for="field in fields" :key="field.name" :field="field" :eventBus="eventBus">

        </input-row>
    </form>
</template>

<script>
    import Form from '../../classes/Form';

    export default {
        name: "BaseForm.vue",
        props: {
            eventBus: Object,
            fields: {
                type: Array,
                required: true,
                validator: function(fields) {
                    return fields.length;
                }
            },
            url: {
                type: String,
                required: true
            }
        },
        data: function() {
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
            // Submit form
            submit: function() {
                this.form.post(this.url)
                    .then(function(response) {
                        this.eventBus.$emit('submitSuccess');
                    }.bind(this))
                    .catch(function(errors) {
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
            }
        },
        // Focus first field in the form after mounting
        mounted() {
            this.form = new Form(this.formData);
            this.eventBus.$on('submitForm', this.submit);
            this.eventBus.$on('inputUpdate', this.updateModel);
            //this.$nextTick(() => this.$refs[this.firstFieldName + 'Input'].focus());
        }
    }
</script>
