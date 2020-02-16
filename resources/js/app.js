
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
import BaseModal from './components/BaseModal.vue';
import BaseForm from './components/form/BaseForm.vue';
import BaseFormRow from './components/form/BaseFormRow.vue';
import BaseFormInput from './components/form/BaseFormInput.vue';
import LoginView from './views/authentication/LoginView.vue';
import RegistrationView from './views/authentication/RegistrationView.vue';

Vue.component("base-modal", BaseModal);
Vue.component("base-form-input", BaseFormInput);
Vue.component("base-form-row", BaseFormRow);
Vue.component("base-form", BaseForm);

new Vue({
    el: '#app',
    components: {
        LanguageSelect,
        LoginView,
        RegistrationView
    },
    i18n,
    router
});
