import React from 'react';
import {Card} from "primereact/card";
import {Editor} from "primereact/editor";
import {Dialog} from "primereact/dialog";

const useCommentEditor = ({isVisible}) => {

    return (
        <Dialog header={'Создание комментария'} visible={isVisible} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
            <Editor className="p-d-flex p-flex-column quill-editor-flex-grow-1 full-width-height" value={text} onTextChange={handleOnTextChange}/>
        </Dialog>
    );
}

export default CommentCreate;
