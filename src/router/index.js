import { createRouter, createWebHistory } from 'vue-router';

// Import components for different routes
import HomePage from '../views/HomePage.vue';
import StoriesPage from '../views/StoriesPage.vue';
import SagaPage from '../views/SagaPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/stories',
        name: 'Stories',
        component: StoriesPage
    },
    {
        path: '/sagas/:id',
        name: 'Saga',
        component: SagaPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
