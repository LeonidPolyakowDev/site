import {createContext} from 'react'

function noop() {

}

export const ToastContext = createContext({
    toast: noop,
})