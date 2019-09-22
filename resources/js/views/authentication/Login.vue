<template>
    <div>
        <a class="button is-light" @click="showLoginModal()">
            {{$t('log_in')}}
        </a>

        <modal v-if="modalIsActive" @close="hideLoginModal()" name="login-modal">
            <div slot="header">{{$t('log_in')}}</div>
            <p>Here is the modal content</p>
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
                modalIsActive: false
            }
        },
        methods: {
            hideLoginModal: function() {
                this.modalIsActive = false;
            },
            login: function() {
                this.hideLoginModal();
            },
            showLoginModal: function() {
                this.modalIsActive = true;
            }
        }
    }
</script>
