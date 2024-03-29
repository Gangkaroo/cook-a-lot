
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import Buefy from 'buefy';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import Moment from 'moment';
import VueAxios from 'vue-axios';
import VueI18n from 'vue-i18n';
import Vuelidate from 'vuelidate';
import de from '../lang/de.json'
import en from '../lang/en.json'
import router from "./routes";
// Icons
import '@mdi/font/css/materialdesignicons.css'
// Vue Auth
import auth                  from '@websanova/vue-auth/dist/v2/vue-auth.common.js';
import driverAuthBearer      from '@websanova/vue-auth/dist/drivers/auth/bearer.js';
import driverHttpAxios       from '@websanova/vue-auth/dist/drivers/http/axios.1.x.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.js';

window.Vue = Vue;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(Buefy);
Vue.use(CKEditor);

window.router = Vue.router = router;

Vue.use(auth, {
    plugins: {
        http: Vue.axios, // Axios
        router: Vue.router,
    },
    drivers: {
        auth: driverAuthBearer,
        http: driverHttpAxios, // Axios
        router: driverRouterVueRouter
    },
    options: {
        rolesKey: 'type',
        notFoundRedirect: {name: 'user-account'},
        parseUserData: function(response) {
            return response || {};
        }
    },
});

// Filters
Vue.filter('datetime', function(dateString) {
    return Moment(dateString).format('DD.MM.YYYY HH:mm');
});

window.axios = axios;
window.i18n = new VueI18n({
    locale: 'de',
    fallbackLocale: 'de',
    messages: {de, en}
});

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};

try {
    window.Popper = require('popper.js').default;
} catch (e) {
    console.log(e);
}


/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
