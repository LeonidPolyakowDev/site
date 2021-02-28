import React, {useContext, useState} from 'react';
import {Card} from "primereact/card";
import PostItem from "./PostItem";
import {ToastContext} from "../context/toast";
import {AuthContext} from "../context/auth";
import {makeUseAxios} from "axios-hooks";
import {httpReq} from "../helpers/tokenHelper";
import {ProgressSpinner} from "primereact/progressspinner";

const PostList = () => {
    const posts = [];
    const useAxios = makeUseAxios({
        axios: httpReq
    })
    const [
        {data: postData, loading, error: postError, response},
        executePosts
    ] = useAxios(
        {
            url: 'api/posts/all',
            method: 'GET'
        },
        {manual: false}
    )

    if (loading)
        return (
            <div className="p-d-flex p-jc-center p-ai-center full-width-height">
                <ProgressSpinner/>
            </div>
        );

    return (
        <div className="p-d-flex p-flex-column p-jc-start p-ai-center full-width-height">
            {response && response.data.map((postInfo) => (<PostItem {...postInfo}/>))}
        </div>
    );
}

export default PostList;
