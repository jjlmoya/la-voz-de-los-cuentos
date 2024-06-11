import { createRouter, createWebHistory } from 'vue-router';

// Import components for different routes
import HomePage from '../views/HomePage.vue';
import StoriesPage from '../views/StoriesPage.vue';
import StoryPage from '../views/StoryPage.vue';

import SagaPage from '../views/SagaPage.vue';
import SagasPage from '../views/SagasPage.vue';

import CustomStoryPage from '../views/CustomStoryPage.vue';
import UnfollowPage from '../views/UnfollowPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/cuentos/',
        name: 'Stories',
        component: StoriesPage
    },
    {
        path: '/cuento/:id',
        name: 'StoryPage',
        component: StoryPage
    },
    {
        path: '/sagas/',
        name: 'Sagas',
        component: SagasPage
    },
    {
        path: '/saga/:id',
        name: 'SagaPage',
        component: SagaPage
    },
    {
        path: '/cuento-personalizado',
        name: 'CustomStyory',
        component: CustomStoryPage
    },
    {
        path: '/quitarse',
        name: 'UnfollowPage',
        component: UnfollowPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

export default router;
