import VueRouter from 'vue-router';

const routes = [
    {
        path: '/',
        component: require('./views/Home').default
    },
    {
        path: '/recipes',
        meta: {
            auth: true
        },
        component: require('./views/recipes/RecipeView').default
    },
    {
        path: '/lists',
        meta: {
            auth: true
        },
        component: require('./views/About').default
    },
    {
        path: '/pantry',
        meta: {
            auth: true
        },
        component: require('./views/About').default
    },
    {
        path: '/menus',
        meta: {
            auth: true
        },
        component: require('./views/About').default
    },
    {
        path: '/notebook',
        meta: {
            auth: true
        },
        component: require('./views/About').default
    },
    {
        path: '/groups',
        meta: {
            auth: true
        },
        component: require('./views/About').default
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'is-active'
});
