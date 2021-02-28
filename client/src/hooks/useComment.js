import React, {useCallback, useState} from 'react';
import {Card} from "primereact/card";
import {Editor} from "primereact/editor";
import {Dialog} from "primereact/dialog";

export default () => {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState(false);
    const handleOnTextChange = useCallback((e) => {
        setText(e.htmlValue)
    }, []);
    const show = useCallback(() => {
        setVisible(true)
    }, []);

    const component = (
        <Dialog header={'Создание комментария'} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <Editor value={text} onTextChange={handleOnTextChange}/>
        </Dialog>
    );

    return [text, show, component];
}
