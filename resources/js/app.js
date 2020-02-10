
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

import LanguageSelect from './views/LanguageSelect.vue';
import Modal from './components/Modal.vue';
import BaseForm from './components/form/BaseForm.vue';
import InputRow from './components/form/InputRow.vue';
import InputField from './components/form/InputField.vue';
import Login from './views/authentication/Login.vue';
import Registration from './views/authentication/Registration.vue';

Vue.component("modal", Modal);
Vue.component("input-field", InputField);
Vue.component("input-row", InputRow);
Vue.component("base-form", BaseForm);

new Vue({
    el: '#app',

    components: {
        LanguageSelect,
        Login,
        Registration
    },
    i18n,
    router
});
