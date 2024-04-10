import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/ru';
import quasarIconSet from 'quasar/icon-set/fontawesome-v6';

import { MaskInput } from 'vue-3-mask';
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
// ..required because of selected iconSet:
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import App from './App.vue';
import './css/app.scss';
import router from './router';
import store from './store';

createApp(App)
    .use(router)
    .use(store)
    .use(MaskInput)
    .use(Quasar, {
        plugins: {}, // import Quasar plugins and add here
        lang: quasarLang,
        iconSet: quasarIconSet,
    })
    .mount('#app')
    .component('MaskInput', MaskInput);
