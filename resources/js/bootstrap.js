
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import de from '../lang/de.json'
import en from '../lang/en.json'

window.Vue = Vue;
Vue.use(VueRouter);
window.axios = axios;
window.i18n = new VueI18n({
    locale: 'de',
    fallbackLocale: 'de',
    messages: {de, en}
});

window._ = require('material-icons');

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
