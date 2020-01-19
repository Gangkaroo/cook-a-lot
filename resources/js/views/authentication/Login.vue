<template>
    <div>
        <a class="button is-primary" @click="showLoginModal()">
            <strong>{{$t('log_in')}}</strong>
        </a>

        <modal v-if="modalIsActive" @close="hideLoginModal()" name="login-modal">
            <div slot="header">{{$t('log_in')}}</div>
            <base-form :fields="fields" :url="url" :event-bus="eventBus">
            </base-form>
            <div slot="footer">
                <a class="button is-primary" @click="login()">OK</a>
                <a class="button is-light" @click="hideLoginModal()">{{$t('cancel')}}</a>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "Login.vue",
        data: function() {
            return {
                loggedIn: false,
                modalIsActive: false,
                eventBus: new Vue(),
                fields: [
                    {
                        name: 'email',
                        label: this.$t('username'),
                        placeholder: this.$t('username_placeholder'),
                        value: '',
                        type: 'input',
                        icon: 'person'
                    },
                    {
                        name: 'password',
                        label: this.$t('password'),
                        placeholder: this.$t('password_placeholder'),
                        value: '',
                        type: 'password',
                        icon: 'lock'
                    }
                ],
                url: '/login'
            }
        },
        methods: {
            // Close the modal
            hideLoginModal: function() {
                this.modalIsActive = false;
            },
            // Submit the form
            login: function() {
                this.eventBus.$emit('submitForm');
            },
            // Show the modal
            showLoginModal: function() {
                this.modalIsActive = true;
            }
        },
        mounted() {
            this.eventBus.$on('submitSuccess', this.hideLoginModal);
        }
    }
</script>
