<template>
    <div>
        <user-info-view :event-bus="eventBus"></user-info-view>

        <a class="button is-primary" @click="showLoginModal()" v-if="!$auth.check()">
            <strong>{{$t('login')}}</strong>
        </a>
        <a class="button is-light" @click="logout()" v-if="$auth.check()">
            <strong>{{$t('logout')}}</strong>
        </a>

        <base-modal v-if="modalIsActive" @close="hideLoginModal()" name="login-modal">
            <div slot="header">{{$t('login')}}</div>
            <base-form :fields="fields" :event-bus="eventBus" :submitHandler="this.submitLogin.bind(this)">
            </base-form>
            <div v-show="hasError" class="help is-danger">{{$t('login_error')}}</div>
            <div slot="footer">
                <a class="button is-primary" @click="login()" :class="{ 'is-loading': requesting }">OK</a>
                <a class="button is-light" @click="hideLoginModal()">{{$t('cancel')}}</a>
            </div>
        </base-modal>
    </div>
</template>

<script>
    import UserInfoView from './UserInfoView.vue';
    import { required, email } from 'vuelidate/lib/validators'

    export default {
        name: "LoginView",
        components: {UserInfoView},

        data: function() {
            return {
                eventBus: new Vue(),
                hasError: false,
                modalIsActive: false,
                requesting: false,
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
            // Let other components know that the user has been logged in
            emitLoggedIn: function() {
                this.eventBus.$emit('loggedIn');
            },
            // Re-fetch the user
            fetchUserData: function() {
                this.$auth.fetch(
                {
                    success: function(response) {
                        this.emitLoggedIn();
                        console.log(response);
                    }
                });
            },
            // Close the modal
            hideLoginModal: function() {
                this.modalIsActive = false;
            },
            // Called after successfully logging in
            loginSuccess: function() {
                this.requesting = false;
                this.hideLoginModal();
                this.emitLoggedIn();
            },
            // Submit the form
            login: function() {
                this.eventBus.$emit('submitForm');
            },
            // Show the error message
            loginError: function() {
                this.hasError = true;
                this.requesting = false;
            },
            // Log out the current user
            logout: function() {
                this.$auth.logout({
                    makeRequest: true
                });
            },
            // Check if the user is still logged in on refresh
            refreshAuthentication: function() {
                this.$auth.refresh({
                    success: function() {console.log('refreshed')},
                    error: function(response) {
                        console.error("An error occurred while refreshing the authentication", response);
                    }
                });
            },
            // Show the modal
            showLoginModal: function() {
                this.modalIsActive = true;
            },
            // Use the auth function to submit the login data
            submitLogin: function(loginData) {
                this.hasError = false;
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
            this.refreshAuthentication();
            // Try to refresh session if user was previously logged in
            this.$auth.ready(function() {
                console.log("ready!", this);
                //this.fetchUserData();
            });
        }
    }
</script>