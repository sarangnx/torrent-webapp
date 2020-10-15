import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
    },
    {
        path: '/app',
        name: 'Torrent',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Torrent')
    }
];

function scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    } else {
        return { top: 0, behavior: 'smooth' };
    }
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior
});

export default router;
