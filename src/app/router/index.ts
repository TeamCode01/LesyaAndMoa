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
    to.name !== 'about-project' &&
    localStorage.getItem('Token') === null
  )
    next({ name: 'Login' });
  else if ((to.name == 'Login' || to.name == 'Registration') && localStorage.getItem('Token'))
    next({ name: 'profile-page' });
  else next();
});



export default router;

