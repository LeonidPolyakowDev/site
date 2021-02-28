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
import {ProgressSpinner} from "primereact/progressspinner";
import {Dialog} from "primereact/dialog";
import useComment from "../hooks/useComment";

const ArticleView = (props) => {
    const articleId = props.match.params.id;
    const [text, show, Dialog] = useComment();

    const useAxios = makeUseAxios({
        axios: httpReq
    })
    const [
        {data, loading, error},
        executeGetPost
    ] = useAxios(
        {
            url: `/api/posts/${articleId}`,
            method: 'GET'
        },
        {manual: false}
    )


    const footer = () => {
        return (
            <span>
                <Button
                    icon="pi pi-comment"
                    label="Комментировать"
                    className="p-button-rounded p-button-outlined"
                    onClick={() => {
                        show();
                    }}
                />
            </span>
        )
    }

    if (loading)
        return (
            <div className="p-d-flex p-jc-center p-ai-center full-width-height">
                <ProgressSpinner/>
            </div>
        );



    return (
        <div className="p-d-flex p-flex-column p-jc-start p-ai-center full-width-height">
            {Dialog}
            <Card
                title={data && data.title}
                footer={footer}
                className="p-col-11 p-m-2">
                <Editor
                    headerTemplate={
                        <span className="ql-formats">
                    </span>
                    }
                    className="p-d-flex p-flex-column quill-editor-flex-grow-1 full-width-height"
                    value={data && data.text}
                    readOnly={true}
                />
            </Card>
        </div>
    );
}

export default ArticleView;
