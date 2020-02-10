<template>
    <div v-if="!$auth.check()">
        <a class="button is-light" @click="showRegistrationModal()">{{$t('sign_up')}}</a>

        <modal v-if="modalIsActive" @close="hideRegistrationModal()" name="registration-modal">
            <div slot="header">{{$t('sign_up')}}</div>
            <base-form :fields="fields" :event-bus="eventBus" :submitHandler="this.submitRegistration.bind(this)">
            </base-form>
            <div v-show="hasError" class="help is-danger">{{$t('registration_error')}}</div>
            <div slot="footer">
                <a class="button is-primary" @click="register()" :class="{ 'is-loading': requesting }">OK</a>
                <a class="button is-light" @click="hideRegistrationModal()">{{$t('cancel')}}</a>
            </div>
        </modal>
    </div>
</template>

<script>
    import { required, alphaNum, minLength, email, sameAs } from 'vuelidate/lib/validators';

    export default {
        name: "Registration.vue",
        data: function() {
            return {
                eventBus: new Vue(),
                hasError: false,
                modalIsActive: false,
                requesting: false,
                fields: [
                    {
                        name: 'name',
                        label: this.$t('username'),
                        placeholder: this.$t('username_placeholder'),
                        value: '',
                        type: 'input',
                        icon: 'person',
                        validation: {
                            required,
                            alphaNum,
                            minLength: minLength(3)
                        },
                        errorMessages: {
                            required: this.$t('username_required'),
                            alphaNum: this.$t('username_format_error'),
                            minLength: this.$t('username_too_short')
                        }
                    },
                    {
                        name: 'email',
                        label: this.$t('email'),
                        placeholder: this.$t('email_placeholder'),
                        value: '',
                        type: 'input',
                        icon: 'email',
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
                            required,
                            minLength: minLength(8)
                        },
                        errorMessages: {
                            required: this.$t('password_required'),
                            minLength: this.$t('password_format_error')
                        }
                    },
                    {
                        name: 'password_confirmation',
                        label: this.$t('password_repeat'),
                        placeholder: this.$t('password_repeat'),
                        value: '',
                        type: 'password',
                        icon: 'lock',
                        validation: {
                            required,
                            sameAsPassword: sameAs('password')
                        },
                        errorMessages: {
                            required: this.$t('password_repeat_required'),
                            sameAsPassword: this.$t('password_not_matching')
                        }
                    }
                ]
            }
        },
        methods: {
            hideRegistrationModal: function() {
                this.modalIsActive = false;
            },
            register: function() {
                this.eventBus.$emit('submitForm');
            },
            // Show the error message
            registrationError: function() {
                this.hasError = true;
                this.requesting = false;
            },
            // Called after successfully logging in
            registrationSuccess: function() {
                this.requesting = false;
                this.loggedIn = true;
                this.hideRegistrationModal();
            },
            showRegistrationModal: function() {
                this.modalIsActive = true;
            },
            submitRegistration: function(registrationData) {
                this.hasError = false;
                this.requesting = true;
                this.$auth.register({
                    params: {
                        email: registrationData.email,
                        name: registrationData.name,
                        password: registrationData.password,
                        password_confirmation: registrationData.password_confirmation
                    },
                    success: this.registrationSuccess.bind(this),
                    error: this.registrationError.bind(this),
                    autoLogin: true,
                    rememberMe: true
                });
            }
        },
        mounted() {
            this.eventBus.$on('submitSuccess', this.hideRegistrationModal);
        }
    }
</script>
