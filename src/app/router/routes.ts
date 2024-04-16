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
        ],
    },
];

export default routes;
