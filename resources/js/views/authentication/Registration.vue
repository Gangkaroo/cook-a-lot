<template>
    <div>
        <a class="button is-light" @click="showRegistrationModal()">{{$t('sign_up')}}</a>

        <modal v-if="modalIsActive" @close="hideRegistrationModal()" name="registration-modal">
            <div slot="header">{{$t('sign_up')}}</div>
            <form>
                <div class="field">
                    <label class="label" for="username">{{$t('username')}}</label>
                    <div class="control has-icons-left">
                        <input type="text" ref="usernameInput" id="username" class="input"
                               :placeholder="$t('username_placeholder')" v-model="form.username">
                        <span class="icon is-small is-left">
                            <i class="material-icons md-18">
                                person
                            </i>
                        </span>
                        <span class="help is-danger" v-if="form.errors.has('username')"
                              v-text="form.errors.get('username')"></span>
                    </div>
                </div>
                <div class="field">
                    <label class="label" for="email">{{$t('email')}}</label>
                    <div class="control has-icons-left">
                        <input type="text" ref="emailInput" id="email" class="input"
                               :placeholder="$t('email_placeholder')" v-model="form.email">
                        <span class="icon is-small is-left">
                            <i class="material-icons md-18">
                                email
                            </i>
                        </span>
                        <span class="help is-danger" v-if="form.errors.has('email')"
                              v-text="form.errors.get('email')"></span>
                    </div>
                </div>
                <div class="field">
                    <label class="label" for="password">{{$t('password')}}</label>
                    <div class="control has-icons-left">
                        <input type="password" id="password" class="input" :placeholder="$t('password_placeholder')"
                               v-model="form.password">
                        <span class="icon is-small is-left">
                            <i class="material-icons md-18">
                                lock
                            </i>
                        </span>
                        <span class="help is-danger" v-if="form.errors.has('password')"
                              v-text="form.errors.get('password')"></span>
                    </div>
                </div>
            </form>
            <div slot="footer">
                <a class="button is-primary" @click="login()">OK</a>
                <a class="button is-light" @click="hideRegistrationModal()">{{$t('cancel')}}</a>
            </div>
        </modal>
    </div>
</template>

<script>
    import Form from '../../classes/Form';

    export default {
        name: "Registration.vue",
        data: function() {
            return {
                modalIsActive: false,
                form: new Form({
                    username: '',
                    email: '',
                    password: ''
                })
            }
        },
        methods: {
            hideRegistrationModal: function() {
                this.modalIsActive = false;
            },
            register: function() {
                this.hideRegistrationModal();
                this.form.post('/register');
            },
            showRegistrationModal: function() {
                this.modalIsActive = true;
                // Set focus after the DOM has been updated
                this.$nextTick(() => this.$refs.usernameInput.focus())
            }
        }
    }
</script>
