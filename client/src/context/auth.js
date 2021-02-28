import {createContext} from 'react'

function noop() {

}

export const AuthContext = createContext({
    login: noop,
    logout: noop,
    loaded: false,
    isAuthenticated: false,
    userId: null
})