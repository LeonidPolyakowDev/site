import React from 'react';
import {Password} from "primereact/password";

export default React.memo((props) => {
    let itemID = props.itemID;

    return (
        <div className="p-field">
            <label htmlFor={itemID}>{props.label}</label>
            <Password id={itemID} name={itemID} value={props.value || ''} onChange={props.handleChange} feedback={props.feedback}/>
        </div>
    )
})
