import {useState, useCallback, useEffect} from 'react'
import {clearToken, getToken, saveToken} from "../helpers/tokenHelper";

const jwt = require('jsonwebtoken');
const storageName = 'authData'

export const useAuth = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((accessToken, refreshToken) => {
        saveToken({accessToken, refreshToken});
        const tokenData = jwt.decode(accessToken);
        setUserId(tokenData.userId);
        setAccessToken(accessToken);
    }, [])

    const logout = useCallback(() => {
        clearToken();
        setAccessToken(null);
    }, [])

    useEffect(() => {
        const tokens = getToken();
        if(tokens && tokens.accessToken) {
            login(tokens.accessToken, tokens.refreshToken);
        }
        setLoaded(true);
    }, [login])

    return {login, logout, accessToken, loaded, userId}
}