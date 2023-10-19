import axios from 'axios';
import { getItem } from './localStorage';
import {ACCESS_TOKEN} from 'utils/constant';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_ENV === 'staging'
    ? process.env.REACT_APP_API_URL_STAGING
    : process.env.REACT_APP_API_URL_LOCAL;

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = getItem(ACCESS_TOKEN)
        const isLoggedIn = !!token;
        const isApiUrl = request.url.startsWith(BASE_URL);
        if (isLoggedIn && isApiUrl) {
            request.headers.common.Authorization = `Bearer ${token}`;
        }
        return request;
    });
    axios.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        console.log(error);
    //     toast.error("JWT token is expired, please try to relogin");
        // return Promise.reject(error);
    });
}