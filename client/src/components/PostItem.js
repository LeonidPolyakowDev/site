import React, {useCallback} from 'react';
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {useHistory} from "react-router-dom";

const {htmlToText} = require('html-to-text');

const PostItem = ({title, text, ...prpps}) => {
    const articleId = prpps._id;
    const history = useHistory();
    const handleLinkClick = useCallback((path) => history.push(`/post/${articleId}`), [history]);

    const footer = () => {
        return (
            <span>
                <Button icon="pi pi-comment" className="p-button-rounded p-button-outlined" onClick={handleLinkClick}/>
            </span>
        )
    }

    return (
        <Card title={title} footer={footer} className="p-col-10 p-m-2 p-shadow-5">
            <p className="p-m-0" style={{lineHeight: '1.5'}}>{text}</p>
        </Card>
    );
}

export default PostItem;
