import React from 'react';
import {useState, useCallback, useContext, useEffect} from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import SaveButton from "./SaveButton";
import {AuthContext} from '../context/auth';
import {Toolbar} from 'primereact/toolbar';
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {ToastContext} from "../context/toast";
import useAxios, {makeUseAxios} from "axios-hooks";
import {InputText} from "primereact/inputtext";
import {Editor} from "primereact/editor";
import {useRouteMatch} from "react-router-dom";
import {httpReq} from '../helpers/tokenHelper';

const Article = () => {
    let {url} = useRouteMatch();
    const {toast} = useContext(ToastContext);
    const {userId} = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const useAxios = makeUseAxios({
        axios: httpReq
    })
    const [
        {data: postData, loading, error: postError, response},
        executePostSave
    ] = useAxios(
        {
            url: 'api/posts/create',
            method: 'POST'
        },
        {manual: true}
    )

    const handleOnTextChange = useCallback((e) => {
        setText(e.htmlValue)
    }, []);

    const handleFieldChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const handleSavePost = async () => {
        try {
            await executePostSave({
                data: {
                    author: userId,
                    text,
                    title
                }
            })
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

    const leftContents = <Button label="Опубликовать" className="p-button-success" onClick={handleSavePost}/>

    return (
        <div className="p-d-flex p-flex-column p-jc-start p-ai-stretch full-width-height p-p-2">
            <Toolbar left={leftContents}/>
            <div className="p-fluid">
                <TextField itemID="articleTitle" label="Заголовок" value={title}
                           handleChange={handleFieldChange} autoComplete={'off'}/>
            </div>
            <Editor className="p-d-flex p-flex-column quill-editor-flex-grow-1 full-width-height" value={text} onTextChange={handleOnTextChange}/>
        </div>
    );
}

export default Article;
