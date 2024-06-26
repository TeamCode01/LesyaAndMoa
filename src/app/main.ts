import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/ru';
import quasarIconSet from 'quasar/icon-set/fontawesome-v6';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue';
import 'vuetify/styles';
import './css/app.scss';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as icons from 'vuetify/iconsets/mdi';

// import 'quasar/src/css/index.sass';
import router from './router';
import store from './store';

const vuetify = createVuetify({
    components,
    directives,
    icons,
});

createApp(App)
    .use(VueSweetalert2)
    .use(vuetify)
    .use(router)
    .use(store)
    .use(Quasar, {
        plugins: {}, // import Quasar plugins and add here
        lang: quasarLang,
        iconSet: quasarIconSet,
    })
    .mount('#app');
