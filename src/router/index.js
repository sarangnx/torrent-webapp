import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
    },
    {
        path: '/torrent',
        name: 'Torrent',
        component: () => import(/* webpackChunkName: "torrent" */ '@/views/Torrent'),
        props: route => ({
            torrent: route.params.torrent,
            paths: route.params.paths
        }),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "torrent-list" */ '@/components/TorrentList')
            },
            {
                path: ':torrent/:paths*',
                props: route => ({
                    torrent: route.params.torrent,
                    paths: route.params.paths
                }),
                component: () => import(/* webpackChunkName: "torrent-list" */ '@/components/FileExplorer')
            }
        ]
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
