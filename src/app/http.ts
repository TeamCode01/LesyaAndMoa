import axios from 'axios';

export const HTTP = axios.create({
    baseURL: 'http://31.129.98.70/api/v1/',
});
