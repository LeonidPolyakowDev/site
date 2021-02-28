import React from 'react';
import {useState, useCallback, useContext, useEffect} from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import SaveButton from "./SaveButton";
import {AuthContext} from '../context/auth';
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {ToastContext} from "../context/toast";
import useAxios from "axios-hooks";

const Signin = () => {
    const {toast} = useContext(ToastContext);
    const {login} = useContext(AuthContext)
    const [data, setData] = useState({})

    const [
        {data: postData, loading, error: postError, response},
        executePostRegistration
    ] = useAxios(
        {
            url: 'api/auth/signin',
            method: 'POST'
        },
        {manual: true}
    )

    const handleFieldChange = useCallback((e) => {
        const {name, value} = e.target
        setData((state) => {
            return {...state, [name]: value}
        })
    }, [])

    const hadleLoginClick = async () => {
        try {
            let resp = await executePostRegistration({
                data: {
                    ...data
                }
            })
            login(resp.data.accessToken, resp.data.refreshToken);
        }
        catch (postError) {
            toast.current.show({
                severity: 'error',
                summary: 'Ошибка',
                detail: postError.response.data.message,
                life: 3000
            });
        }
    }

    return (
        <div className="p-d-flex p-jc-center p-ai-center full-width-height">
            <Card className="p-col-5" title="Авторизация" footer={<SaveButton label={"Войти"} handleClick={hadleLoginClick} disabled={/*loading*/false}/>}>
                <div className="p-fluid">
                    <TextField itemID="login" label="Логин" value={data['login'] || ''}
                               handleChange={handleFieldChange} autoComplete={'off'}/>
                    <PasswordField itemID="password" label="Пароль" value={data['password'] || ''}
                                   handleChange={handleFieldChange} feedback={false}/>
                </div>
                <a href="signup" className="auth-link" target="_self">Нет аккаунта? Зарегестрируйтесь.</a>
            </Card>
        </div>
    );
}

export default Signin;
