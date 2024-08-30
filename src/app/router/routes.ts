import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
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
                path: '/game',
                meta: {
                    hiddenBreadcrumbs: true,
                },
                children: [
                    {
                        path: ':idChildOrGroup',
                        children: [
                            {
                                path: '',
                                name: 'Game',
                                component: () =>
                                    import(
                                        '@pages/StartGamePage/components/StartGamePage.vue'
                                    ),
                            }
                        ]
                    },
                ]

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
                                    label: 'news.title',
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
                path: '',
                name: 'main-page',
                component: () =>
                    import('@pages/MainPage/components/MainPage.vue'),
                meta: {
                    hiddenBreadcrumbs: true,
                },
            },
            {
                path: '/change-password',
                name: 'ChangePassword',
                meta: {
                    hiddenBreadcrumbs: true,
                },
                component: () =>
                    import(
                        '@pages/ChangePasswordPage/components/ChangePasswordPage.vue'
                    ),
            },
            {
                path: '/create-password',
                name: 'CreatePassword',
                meta: {
                    hiddenBreadcrumbs: true,
                },
                component: () =>
                    import(
                        '@pages/ChangePasswordPage/components/CreatePasswordPage.vue'
                    ),
            }, {
                path: '/profile-page',
                name: 'profile-page',
                meta: {
                    hiddenBreadcrumbs: true,
                },
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
                meta: {
                    hiddenBreadcrumbs: true,
                },
                component: () =>
                    import('@pages/404Page/components/404Page.vue'),
            },
            {
                path: '/policy-page',
                name: 'policy-page',
                meta: {
                    hiddenBreadcrumbs: true,
                },
                component: () =>
                    import('@pages/PolicyPage/components/PolicyPage.vue'),
            },


        ]

    },


];

export default routes;
