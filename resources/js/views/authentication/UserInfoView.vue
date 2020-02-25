<template>
    <a v-if="username.length" class="button is-light">
        {{$t('hi')}} {{username}}!
    </a>
</template>

<script>
    export default {
        name: 'UserInfoView',
        props: {
            eventBus: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                email: '',
                username: ''
            }
        },
        computed: {
            // Get and set the user of the auth module directly
            userData: {
                get: function() {
                    return this.$auth.user();
                },
                set: function (newData) {
                    this.$auth.user(newData);
                }
            }
        },
        methods: {
            // Update the user data
            updateData: function() {
                let user = this.$auth.user();
                if (typeof user.email !== 'undefined') {
                    this.email = user.email;
                    this.username = user.name;
                } else {
                    this.email = '';
                    this.username = '';
                }

            }
        },
        watch: {
            // Watch the user data for changes
            userData: function(newData) {
                this.userData = newData;
                this.updateData();
            }
        }
    }
</script>
