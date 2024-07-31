import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'main-page',
                component: () =>
                    import('@pages/MainPage/components/MainPage.vue'),
            },
            {
                path: '/login',
                name: 'Login',
                component: () =>
                    import('@pages/LoginPage/components/LoginPage.vue'),
            },
            {
                path: '/change-password',
                name: 'ChangePassword',
                component: () =>
                    import(
                        '@pages/ChangePasswordPage/components/ChangePasswordPage.vue'
                    ),
            },
            {
                path: '/create-password',
                name: 'CreatePassword',
                component: () =>
                    import(
                        '@pages/ChangePasswordPage/components/CreatePasswordPage.vue'
                    ),
            },
            {
                path: '/registration',
                name: 'Registration',
                component: () =>
                    import('@pages/RegisterPage/components/RegisterPage.vue'),
            },

            {
                path: '/about-project',
                name: 'about-project',
                component: () =>
                    import(
                        '@pages/AboutProjectPage/components/AboutProjectPage.vue'
                    ),
            },
            {
                path: ':catchAll(.*)*',
                name: '404',
                component: () =>
                    import('@pages/404Page/components/404Page.vue'),
            },
            {
                path: '/policy-page',
                name: 'policy-page',
                component: () =>
                    import('@pages/PolicyPage/components/PolicyPage.vue'),
            },
            {
                path: '/game',
                children: [
                    {
                        path:':idChild',
                        name: 'Game',
                        component: () =>
                            import('@pages/StartGamePage/components/StartGamePage.vue'),
                        }
                ]
            },
            {
                path: '/profile-page',
                name: 'profile-page',
                component: () =>
                    import('@pages/ProfilePage/components/ProfilePage.vue'),
            },
        ],
    },
];

export default routes;
