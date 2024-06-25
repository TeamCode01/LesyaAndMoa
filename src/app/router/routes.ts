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
            {
                path: '/Login',
                name: 'Login',
                component: () =>
                    import('@pages/LoginPage/components/LoginPage.vue'),
            },
            {
                path: '/ChangePassword',
                name: 'ChangePassword',
                component: () =>
                    import(
                        '@pages/ChangePasswordPage/components/ChangePasswordPage.vue'
                    ),
            },
            {
                path: '/CreatePassword',
                name: 'CreatePassword',
                component: () =>
                    import(
                        '@pages/ChangePasswordPage/components/CreatePasswordPage.vue'
                    ),
            },
            {
                path: '/Registration',
                name: 'Registration',
                component: () =>
                    import('@pages/RegisterPage/components/RegisterPage.vue'),
            },
            // {
            //     path: '/AboutProject',
            //     name: 'AboutProject',
            //     component: () =>
            //         import(
            //             '@pages/AboutProjectPage/components/AboutProjectPage.vue'
            //         ),
            // },
            {
                path: ':catchAll(.*)*',
                name: '404',
                component: () =>
                    import('@pages/404Page/components/404Page.vue'),
            },
            {
                path: '/PolicyPage',
                name: 'PolicyPage',
                component: () =>
                    import('@pages/PolicyPage/components/PolicyPage.vue'),
            },
            {

                path: '/Game',
                name: 'Game',
                component: () =>
                    import('@pages/StartGamePage/components/StartGamePage.vue'),

            },
        ],
    },
];

export default routes;
