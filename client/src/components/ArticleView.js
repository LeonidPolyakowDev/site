import React from 'react';
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {makeUseAxios} from "axios-hooks";
import {Editor} from "primereact/editor";
import {httpReq} from '../helpers/tokenHelper';
import {ProgressSpinner} from "primereact/progressspinner";
import useComment from "../hooks/useComment";
import {Skeleton} from "primereact/skeleton";

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
            <div className="custom-skeleton p-p-4">
                <div className="p-d-flex p-mb-3">
                    <Skeleton shape="circle" size="4rem" className="p-mr-2"></Skeleton>
                    <div>
                        <Skeleton width="10rem" className="p-mb-2"></Skeleton>
                        <Skeleton width="5rem" className="p-mb-2"></Skeleton>
                        <Skeleton height=".5rem"></Skeleton>
                    </div>
                </div>
                <Skeleton width="100%" height="150px"></Skeleton>
                <div className="p-d-flex p-jc-between p-mt-3">
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
            </div>
            // <div className="p-d-flex p-jc-center p-ai-center full-width-height">
            //     <ProgressSpinner/>
            // </div>
        );

    return (
        <div className="p-d-flex p-flex-column p-jc-start p-ai-center full-width-height">
            {Dialog}
            <Card
                title={data && data.title}
                subTitle={
                    <div>
                        <div><b><h3>{data.authorName}</h3></b></div>
                        <div><h6>{data.dateCreated}</h6></div>
                    </div>
                }
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
