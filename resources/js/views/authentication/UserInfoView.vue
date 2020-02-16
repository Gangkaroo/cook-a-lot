<template>
    <div v-if="$auth.check()">
        <span class="has-text-weight-bold">{{username}}</span>
    </div>
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
        methods: {
            updateData: function() {
                console.log(this.$auth.user());
            }
        },
        mounted: function() {
            this.eventBus.$on('loggedIn', this.updateData);
        }
    }
</script>
