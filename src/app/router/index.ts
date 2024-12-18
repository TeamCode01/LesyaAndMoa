import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }
    },
});

router.beforeEach((to, _from, next) => {
    if (
        to.name !== 'Login' &&
        to.name !== 'Registration' &&
        to.name !== 'ChangePassword' &&
        to.name !== 'CreatePassword' &&
        to.name !== 'about-project' &&
        to.name !== 'policy-page' &&
        to.name !== 'policy' &&
        to.name !== 'main-page' &&
        to.name !== 'news' &&
        to.name !== 'page' &&
        to.name !== '404' &&
        localStorage.getItem('Token') === null
    )
        next({ name: 'Login' });
    else if (
        (to.name == 'Login' || to.name == 'Registration') &&
        localStorage.getItem('Token')
    )
        next({ name: 'profile-page' });
    else next();
});

export default router;
