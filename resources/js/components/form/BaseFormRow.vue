<template>
    <div class="field" v-show="isVisible" :class="{'has-addons': hasAddOnButton}">
        <label v-if="field.label" class="label" :for="field.name">{{field.label}}</label>
        <div class="control has-icons-right" :class="{'has-icons-left': hasIcon, 'is-expanded': hasAddOnButton}">
            <!-- Input field -->
            <base-input
                v-if="isInput"
                :name="field.name"
                :value="field.value"
                :placeholder="field.placeholder"
                :type="field.type"
                :icon-name="field.icon"
                :event-bus="eventBus"
                :index="index">
            </base-input>
            <!-- Inline editor -->
            <base-editor
                v-if="isEditor"
                :name="field.name"
                :value="field.value"
                :placeholder="field.placeholder"
                :event-bus="eventBus"
                :index="index">
            </base-editor>
            <!-- Autocomplete input field -->
            <base-autocomplete
                v-if="isAutocomplete"
                :name="field.name"
                :placeholder="field.placeholder"
                :event-bus="eventBus"
                :index="index"
                :search-handler="field.searchHandler">
            </base-autocomplete>
            <!-- Title or content at the top or in between form elements-->
            <base-content
                v-if="isContent"
                :title="field.title"
                :content="field.content">
            </base-content>
            <!-- Custom component: add a non-typical custom form component in-between -->
            <base-custom-component
                :component="field.component"
                :properties="field.properties"
                :event-bus="eventBus"
            ></base-custom-component>
<!--            <select-field v-if="isSelect" name="{{field.name}}"></select-field>-->
<!--            <checkable-field v-if="isCheckable" name="{{field.name}}"></checkable-field>-->
            <span class="help is-danger" v-if="hasError"
                  v-text="errorMessage"></span>
        </div>
        <div v-if="hasAddOnButton" class="control">
            <button type="button" class="button is-primary" @click="field.addOnButtonHandler">
                <b-icon :icon="field.addOnButton"></b-icon>
            </button>
        </div>
    </div>
</template>

<script>
    import BaseAutocomplete from "./BaseAutocomplete";
    import BaseCustomComponent from "./BaseCustomComponent";
    import BaseEditor from "./BaseEditor";
    import BaseInput from "./BaseInput";
    import BaseContent from "./BaseContent";
    export default {
        name: "InputRow.vue",
        components: {
            BaseAutocomplete,
            BaseContent,
            BaseCustomComponent,
            BaseEditor,
            BaseInput
        },
        props: {
            eventBus: Object,
            field: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        },

        data: () => {
            return {
                hasError: false,
                errorMessage: ''
            }
        },

        computed: {
            hasAddOnButton: function() {
                return typeof this.field.addOnButton !== 'undefined' && this.field.addOnButton.length;
            },

            hasIcon: function() {
                return typeof this.field.icon !== 'undefined' && this.field.icon.length;
            },

            isAutocomplete: function() {
                return this.field.type === 'autocomplete';
            },

            isCheckable: function() {
                return this.field.type === 'radio' || this.field.type === 'checkbox';
            },

            isContent: function() {
                return this.field.type === 'content';
            },

            isEditor: function() {
                return this.field.type === 'editor';
            },

            isInput: function() {
                return this.field.type === 'input'
                    || this.field.type === 'password'
                    || this.field.type === 'hidden';
            },

            isSelect: function() {
                return this.field.type === 'select';
            },

            isVisible: function() {
                return this.field.type !== 'hidden';
            }
        },

        methods: {
            checkIfHide: function(name) {
                if (name === this.field.name) {
                    this.hideError();
                }
            },

            hideError: function() {
                this.hasError = false;
                this.errorMessage = '';
            },

            // Mark form input as erronous
            showError: function(message) {
                this.hasError = true;
                this.errorMessage = message
            }
        },

        mounted() {
            this.eventBus.$on('fieldBlurred', this.checkIfHide);
            this.eventBus.$on(this.field.name + 'Error', this.showError)
        }
    }
</script>
