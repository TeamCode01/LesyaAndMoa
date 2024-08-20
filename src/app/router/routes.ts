import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        meta: {
            redirectTo: 'Login',
        },
        children: [
            {
                path: '/login',
                name: 'Login',
                meta: {
                    hiddenBreadcrumbs: true,
                },
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
            }, {
                path: '/profile-page',
                name: 'profile-page',
                component: () =>
                    import(
                        '@pages/ProfilePage/components/ProfilePage.vue'
                    ),
            },
            {
                path: '/registration',
                name: 'Registration',
                meta: {
                    hiddenBreadcrumbs: true,
                },
                component: () =>
                    import('@pages/RegisterPage/components/RegisterPage.vue'),
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
                        path: ':idChildOrGroup',
                        name: 'Game',
                        component: () =>
                            import(
                                '@pages/StartGamePage/components/StartGamePage.vue'
                            ),
                    },
                ],
            },

        ],
    },
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        meta: {
            label: 'Главная',
            redirectTo: 'main-page',
        },
        children: [
            {
                path: '/main-page',
                name: 'main-page',
                component: () =>
                    import('@pages/MainPage/components/MainPage.vue'),
                meta: {
                    hiddenBreadcrumbs: true,
                },
            },
            {
                path: '/about-project',
                name: 'about-project',
                component: () =>
                    import(
                        '@pages/AboutProjectPage/components/AboutProjectPage.vue'
                    ),
                meta: {
                    label: 'О проекте',
                },
            },
            {
                path: '/news-page',
                meta: {
                    redirectTo: 'news',
                    label: 'Новости',
                },
                children: [
                    {
                        path: '',
                        name: 'news',
                        meta: {},
                        component: () =>
                            import('@pages/NewsPage/components/NewsListPage.vue'),
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                path: 'news-item',
                                meta: {
                                    label: 'block.title',
                                    isObject: true,
                                },
                                children: [
                                    {
                                        path: '',
                                        name: 'page',
                                        component: () =>
                                            import('@pages/NewsPage/components/NewsPage.vue'),
                                    }
                                ]
                            },
                        ]
                    },
                ],
            },
        ]
    }
];

export default routes;
