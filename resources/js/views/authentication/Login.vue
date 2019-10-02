<template>
    <div>
        <a class="button is-primary" @click="showLoginModal()">
            <strong>{{$t('log_in')}}</strong>
        </a>

        <modal v-if="modalIsActive" @close="hideLoginModal()" name="login-modal">
            <div slot="header">{{$t('log_in')}}</div>
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
                <a class="button is-light" @click="hideLoginModal()">{{$t('cancel')}}</a>
            </div>
        </modal>
    </div>
</template>

<script>
    import Form from '../../classes/Form';

    export default {
        name: "Login.vue",
        data: function() {
            return {
                loggedIn: false,
                modalIsActive: false,
                form: new Form({
                    username: '',
                    password: ''
                })
            }
        },
        methods: {
            hideLoginModal: function() {
                this.modalIsActive = false;
            },
            login: function() {
                this.hideLoginModal();
                this.form.post('/login');
            },
            showLoginModal: function() {
                this.modalIsActive = true;
                // Set focus after the DOM has been updated
                this.$nextTick(() => this.$refs.usernameInput.focus())
            }
        }
    }
</script>
