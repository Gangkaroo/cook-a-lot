<template>
    <div :id="this.name">
        <b-autocomplete
            :tabindex="this.index"
            ref="autocomplete"
            :data="data"
            :placeholder="placeholder"
            :icon="iconName"
            :typing="searchData"
            :loading="isSearching"
            v-model="content">
            <template slot="footer" v-if="footer.length">{{ footer }}</template>
            <template slot="empty">{{$t('No results for')}} {{name}}</template>
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
                content: this.initialContent,
                data: [],
                isSearching: false
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
            // Search data using the provided search handler
            searchData: function(searchTerm) {
                if (!this.isSearching) {
                    return;
                }

                if (!searchTerm.length) {
                    this.data = [];
                    return;
                }

                this.isSearching = true;
                this.searchHandler(searchTerm)
                    .then(({ data }) => {
                        this.data = data.isArray() ? data : [];
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

