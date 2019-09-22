
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding views to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import router from './routes';

import LanguageSelect from './views/LanguageSelect.vue';
import Modal from './components/Modal.vue';
import Login from './views/authentication/Login.vue';

Vue.component("modal", Modal);

new Vue({
    el: '#app',

    components: {
        LanguageSelect,
        Login
    },

    i18n,

    router
});

router.push('/');
