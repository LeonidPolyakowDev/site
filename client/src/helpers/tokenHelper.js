import axios from "axios";

const jwt = require('jsonwebtoken');
const sessionTokenKey = "tokenData";
const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(refreshTokensBeforeRequest,
    function (error) {
        return Promise.reject(error);
    });

export const httpReq = axiosInstance;

export function getToken() {
    try {
        const tokens = localStorage.getItem(sessionTokenKey);
        return tokens ? JSON.parse(tokens) : null;
    } catch (e) {
        return null;
    }
}

export function saveToken(token) {
    localStorage.setItem(sessionTokenKey, JSON.stringify(token));
}

export function clearToken() {
    localStorage.removeItem(sessionTokenKey);
}

async function refreshTokens(refreshToken) {
    const response = await axios.post('api/auth/refreshTokens',
        {refreshToken});
    if (response.status === 200) {
        return response.data;
    } else
        throw new Error('Refresh error');
}

async function refreshTokensBeforeRequest(options) {
    const loginUrl = '/signin'; // url страницы для авторизации
    let tokenData = getToken(); // объявляем локальную переменную tokenData

    if (!tokenData)
        return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации

    if (!options.headers) { // если в запросе отсутствует headers, то задаем их
        options.headers = {};
    }
    const accessTokenData = jwt.decode(tokenData.accessToken);
    if (Date.now() >= accessTokenData.exp * 1000) { // проверяем не истек ли срок жизни токена
        try {
            const newToken = await refreshTokens(tokenData.refreshToken); // если истек, то обновляем токен с помощью refresh_token
            saveToken(newToken);
        } catch (err) { // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
            clearToken();
            return window.location.replace(loginUrl);
        }
    }
    options.headers.Authorization = `Bearer ${tokenData.accessToken}`; // добавляем токен в headers запроса
    return options;
}