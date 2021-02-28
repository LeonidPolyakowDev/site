import React from 'react';
import {useState, useCallback, useContext, useEffect} from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import {Card} from "primereact/card";
import SaveButton from "./SaveButton";
import {AuthContext} from '../context/auth';
import {ToastContext} from '../context/toast';
import useAxios from "axios-hooks";

const Signup = () => {
    const {toast} = useContext(ToastContext);
    const {login} = useContext(AuthContext)
    const [data, setData] = useState({})

    const [
        {data: postData, loading, error: postError},
        executePostRegistration
    ] = useAxios(
        {
            url: 'api/auth/signup',
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

    const handleSignup = async () => {
        try {
            await executePostRegistration({
                data: {
                    ...data
                }
            })
        } catch (postError) {
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
            <Card className="p-col-5" title="Регистрация"
                  footer={<SaveButton label={"Зарегистрироваться"} handleClick={handleSignup} disabled={false}/>}>
                <div className="p-fluid">
                    <TextField itemID="login" label="Логин" value={data['login'] || ''}
                               handleChange={handleFieldChange} autoComplete={'off'}/>
                    <PasswordField itemID="password" label="Пароль" value={data['password'] || ''}
                                   handleChange={handleFieldChange} feedback={false}/>
                </div>
                <a href="signin" className="auth-link" target="_self">Есть аккаунта? Авторизуйтесь.</a>
            </Card>
        </div>
    );
}

export default Signup;
