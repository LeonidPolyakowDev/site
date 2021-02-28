import {InputText} from "primereact/inputtext";
import React from "react";
import {useState} from "react";

export default React.memo((props) => {
    let itemID = props.itemID;

    return (
        <div className="p-field">
            <label htmlFor={itemID}>{props.label}</label>
            <InputText id={itemID} name={itemID} value={props.value || ''} onChange={props.handleChange} type={props.type || "text"} autoComplete={props.autoComplete || 'on'}/>
        </div>
    )
})