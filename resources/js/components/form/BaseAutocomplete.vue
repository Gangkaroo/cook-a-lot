<template>
    <div :id="this.name">
        <b-autocomplete
            :tabindex="this.index"
            ref="autocomplete"
            :data="data"
            :placeholder="placeholder"
            :icon="iconName"
            icon-clickable
            @icon-click="iconHandler"
            @typing="searchData"
            @blur="fieldBlurred"
            @select="setSelected"
            field="label"
            :loading="isSearching"
            :keep-first="true"
            v-model="value">
            <template #footer v-if="footer.length">{{ footer }}</template>
            <template #empty>{{$t('no_results_found')}}</template>
        </b-autocomplete>
    </div>
</template>

<script>

    export default {
        name: "BaseAutocomplete",
        props: {
            index: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            iconName: String,
            iconHandler: {
                type: Function,
                default: () => {}
            },
            intialContent: {
                type: String,
                default: ''
            },
            footer: {
                type: String,
                default: ''
            },
            searchHandler: {
                type: Function,
                required: true
            },
            placeholder: String,
            eventBus: Object
        },
        data: function() {
            return {
                data: [],
                isSearching: false,
                searchTerm: '',
                selected: null,
                value: ''
            }
        },
        computed: {
            isCorrect: function() {
                return !this.hasError && this.touched;
            }
        },

        watch: {
            // Watch the value for changes
            value: function(newVal, oldVal) {
                // If something has been selected, only replace the search term with the selected value
                if (this.selected) {
                    this.value = oldVal.replace(this.searchTerm, newVal);
                    this.selected = null;
                }
                this.valueUpdated();
            }
        },

        methods: {
            // Emit the blurred event
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
            // Search data using the provided search handler
            searchData: function(searchTerm) {
                if (this.isSearching) {
                    return;
                }

                if (!searchTerm.length) {
                    this.data = [];
                    return;
                }

                this.isSearching = true;
                let words = searchTerm.split(' ');
                // Search using the last word
                this.searchTerm = words.pop();
                this.searchHandler(this.searchTerm)
                    .then(({ data }) => {
                        // The label property is then shown in dropdown
                        this.data = Array.isArray(data) ? data : [];
                    })
                    .catch((error) => {
                        this.data = [];
                        console.error(error);
                    })
                    .finally(() => {
                        this.isSearching = false;
                    })
            },
            // An error has been recorded
            setError: function() {
                this.hasError = true;
            },
            // Set the selected option
            setSelected(option) {
                this.selected = option;
            },
            // Update the model of the form
            valueUpdated: function() {
                this.eventBus.$emit('inputUpdate', {name: this.name, value: this.value});
            }
        },
        mounted() {
            // Listen for server or validation errors
            this.eventBus.$on(this.name + 'Error', this.setError);

            // Focus input if it is the first input
            if (this.index === 1) {
                this.$nextTick(() => {
                    this.focusInput();
                });
            }
        }
    }
</script>

