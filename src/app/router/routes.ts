import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'MainPage',
                component: () =>
                    import('@pages/MainPage/components/MainPage.vue'),
            },
        ],
    },
];

export default routes;
