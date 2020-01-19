<template>
    <div class="field">
        <label class="label" :for="field.name">{{field.label}}</label>
        <div class="control has-icons-left">
            <input-field v-if="isInput" :name="field.name" :placeholder="field.placeholder" :type="field.type"
                         :icon-name="field.icon" :eventBus="eventBus">

            </input-field>
<!--            <select-field v-if="isSelect" name="{{field.name}}"></select-field>-->
<!--            <textarea-field v-if="isTextarea" name="{{field.name}}"></textarea-field>-->
<!--            <checkable-field v-if="isCheckable" name="{{field.name}}"></checkable-field>-->
            <span class="help is-danger" v-if="hasError"
                  v-text="errorMessage"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputRow.vue",
        props: {
            eventBus: Object,
            field: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                hasError: false,
                errorMessage: ''
            }
        },
        computed: {
            isCheckable: function() {
                return this.field.type === 'radio' || this.field.type === 'checkbox';
            },
            isInput: function() {
                return this.field.type === 'input' || this.field.type === 'password';
            },
            isSelect: function() {
                return this.field.type === 'select';
            },
            isTextarea: function() {
                return this.field.type === 'textarea';
            }
        },
        methods: {
            hideError: function() {
                this.hasError = false;
                this.errorMessage = '';
            },
            // Mark form input as erronous
            showError: function () {
                this.hasError = true;
                this.errorMessage = 'an error occurred'
            }
        },
        mounted() {
            console.log(this.field.name + 'Error');
            this.eventBus.$on(this.field.name + 'Error', this.showError)
        }
    }
</script>
