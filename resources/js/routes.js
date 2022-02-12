import VueRouter from 'vue-router';

const routes = [
    {
        path: '/',
        component: require('./views/Home.vue').default
    },
    {
        path: '/recipes',
        meta: {
            auth: true
        },
        component: require('./views/recipes/RecipeView.vue').default
    },
    {
        path: '/recipe/:recipeId',

        meta: {
            auth: true
        },
        component: require('./views/recipes/EditRecipeView.vue').default,
        props: true
    },
    {
        path: '/lists',
        meta: {
            auth: true
        },
        component: require('./views/About.vue').default
    },
    {
        path: '/pantry',
        meta: {
            auth: true
        },
        component: require('./views/About.vue').default
    },
    {
        path: '/menus',
        meta: {
            auth: true
        },
        component: require('./views/About.vue').default
    },
    {
        path: '/notebook',
        meta: {
            auth: true
        },
        component: require('./views/About.vue').default
    },
    {
        path: '/groups',
        meta: {
            auth: true
        },
        component: require('./views/About.vue').default
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'is-active'
});
