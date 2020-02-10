import VueRouter from 'vue-router';

const routes = [
    {
        path: '/',
        component: require('./views/Home').default
    },
    {
        path: '/recipes',
        component: require('./views/About').default
    },
    {
        path: '/lists',
        component: require('./views/About').default
    },
    {
        path: '/pantry',
        component: require('./views/About').default
    },
    {
        path: '/menus',
        component: require('./views/About').default
    },
    {
        path: '/notebook',
        component: require('./views/About').default
    },
    {
        path: '/groups',
        component: require('./views/About').default
    }
];

export default new VueRouter({
    routes,

    linkActiveClass: 'is-active'
});
