import axios from 'axios';
import { useUserStore } from '@layouts/stores/user';
import router from './router';
export const HTTP = axios.create({
    // baseURL: 'http://31.129.98.70/api/v1/',,
    baseURL: 'https://xn----8sbnxhms6i.xn--p1ai/api/v1/',
});

const urls = [
    '/token/login/',
    '/users/',
    '/news/',
    '/users/reset_password_confirm/',
]

const post_urls = [
    '/users/reset_password/',
]



HTTP.interceptors.request.use(
    (config) => {
        const configUrl = config.url?.split('?').shift();
        if (urls.some((item) => item === configUrl) || post_urls.some((item) => item === configUrl) && config.method === 'post' || configUrl?.includes('news') || (configUrl?.includes('news') && /\d/.test(configUrl))) {
            // console.log(configUrl)
            delete config.headers.Authorization;
        } else {
            // console.log(configUrl)
            config.headers.Authorization =
                'Token ' + localStorage.getItem('Token');
        }
        return config;
    },
    function (error) {
        console.log('aborted');
        return error;
    },
);


HTTP.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401) {
                const originalRequest = err.config;
                const userStore = useUserStore();
                try {
                    console.log('here');
                    console.log(originalRequest.url);
                    if (
                        localStorage.getItem('Token')

                    ) {
                        userStore.logOut();
                        localStorage.removeItem('Token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('type');
                        router.push({ name: 'Login' });
                        console.log('here token yes');
                    } else {
                        console.log('here token no');
                        userStore.logOut();
                        localStorage.removeItem('Token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('type');
                        router.push({ name: 'Login' });
                    }
                } catch (error) {
                    console.log('token err');
                    return Promise.reject(error);
                }
            }
            if (err.response.status === 403 && err.response.data) {
                console.log('403 err', router);
                // router.push({ name: 'mypage' });
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    },
);