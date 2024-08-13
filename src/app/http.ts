import axios from 'axios';
export const HTTP = axios.create({
    baseURL: 'https://xn----8sbnxhms6i.xn--p1ai/api/v1/',
});

HTTP.interceptors.request.use(
    (config) => {
      if (
        config.url == '/token/login/' || (config.url == '/users/' && config.method == 'post')  ||
        config.url == '/reset_password/' ||
        config.url == '/reset_password_confirm/'
      ) {
        delete config.headers.Authorization;
      } else {
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