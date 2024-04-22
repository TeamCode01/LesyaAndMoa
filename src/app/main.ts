import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/ru';
import quasarIconSet from 'quasar/icon-set/fontawesome-v6';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import App from './App.vue';
import './css/app.scss';
// import 'quasar/src/css/index.sass';
import router from './router';
import store from './store';

createApp(App)
    .use(router)
    .use(store)
    .use(Quasar, {
        plugins: {}, // import Quasar plugins and add here
        lang: quasarLang,
        iconSet: quasarIconSet,
    })
    .mount('#app');
