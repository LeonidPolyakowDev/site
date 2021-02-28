import useRoutes from "./hooks/useRoutes";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/auth";
import {ToastContext} from "./context/toast";
import {useAuth} from "./hooks/useAuth";
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {getToken} from "./helpers/tokenHelper";
import {ProgressSpinner} from 'primereact/progressspinner';
import {Card} from "primereact/card";
import SaveButton from "./components/SaveButton";
import TextField from "./components/TextField";
import PasswordField from "./components/PasswordField";

function App() {
    const toast = useRef(null);
    const {login, logout, accessToken, loaded, userId} = useAuth();
    const tokens = getToken();
    const isAuthenticated = !!(accessToken);    //
    const routes = useRoutes(isAuthenticated)

    return !loaded
        ?
        <div className="p-d-flex p-jc-center p-ai-center full-width-height">
            <ProgressSpinner/>
        </div>
        : <>
            <Toast ref={toast}/>
            <AuthContext.Provider value={{login, logout, isAuthenticated, userId}}>
                <ToastContext.Provider value={{toast}}>
                    <BrowserRouter>
                        {routes}
                    </BrowserRouter>
                </ToastContext.Provider>
            </AuthContext.Provider>
        </>
}

export default App;
