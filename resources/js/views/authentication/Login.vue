<template>
    <div>
        <a class="button is-primary" @click="showLoginModal()" v-if="!loggedIn">
            <strong>{{$t('log_in')}}</strong>
        </a>
        <a class="button is-light" @click="logout()" v-if="loggedIn">
            <strong>{{$t('log_out')}}</strong>
        </a>

        <modal v-if="modalIsActive" @close="hideLoginModal()" name="login-modal">
            <div slot="header">{{$t('log_in')}}</div>
            <base-form :fields="fields" :event-bus="eventBus" :submitHandler="this.submitLogin.bind(this)">
            </base-form>
            <div slot="footer">
                <a class="button is-primary" @click="login()" :class="{ 'is-loading': requesting }">OK</a>
                <a class="button is-light" @click="hideLoginModal()">{{$t('cancel')}}</a>
            </div>
        </modal>
    </div>
</template>

<script>
    import { required, email } from 'vuelidate/lib/validators'

    export default {
        name: "Login.vue",
        data: function() {
            return {
                requesting: false,
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
                        icon: 'person',
                        validation: {
                            required,
                            email
                        },
                        errorMessages: {
                            required: this.$t('email_required'),
                            email: this.$t('email_format_error')
                        }
                    },
                    {
                        name: 'password',
                        label: this.$t('password'),
                        placeholder: this.$t('password_placeholder'),
                        value: '',
                        type: 'password',
                        icon: 'lock',
                        validation: {
                            required
                        },
                        errorMessages: {
                            required: this.$t('password_required')
                        }
                    }
                ]
            }
        },
        methods: {
            // Close the modal
            hideLoginModal: function() {
                this.modalIsActive = false;
            },
            // Called after successfully logging in
            loginSuccess: function(response) {
                this.requesting = false;
                this.loggedIn = true;
                this.hideLoginModal();
                console.log(response, this.$auth.check());
            },
            // Submit the form
            login: function() {
                this.eventBus.$emit('submitForm');
            },
            // Submit the form
            loginError: function(response) {
                this.requesting = false;
                console.log(response);
            },
            logout: function() {
                this.$auth.logout({
                    makeRequest: true
                });
                this.loggedIn = false;
            },
            // Show the modal
            showLoginModal: function() {
                this.modalIsActive = true;
            },
            // Use the auth function to submit the login data
            submitLogin: function(loginData) {
                this.requesting = true;
                this.$auth.login({
                    params: {
                        email: loginData.email,
                        password: loginData.password
                    },
                    success: this.loginSuccess.bind(this),
                    error: this.loginError.bind(this),
                    rememberMe: true,
                    fetchUser: true
                });
            }
        },
        mounted() {
            this.eventBus.$on('submitSuccess', this.hideLoginModal);
        }
    }
</script>
