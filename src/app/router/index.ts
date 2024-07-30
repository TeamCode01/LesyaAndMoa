import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, _from, next) => {
    if (
      to.name !== 'Login' &&
      to.name !== 'Registration' &&
      to.name !== 'ChangePassword' &&
      to.name !== 'CreatePassword' &&
      to.name !== 'main-page' &&
      localStorage.getItem('Token') === null
    )
      next({ name: 'Login' });
    else if (to.name == 'main-page' && localStorage.getItem('Token') !== null)
      next({ name: 'profile-page' });
    else next();
  });



export default router;

