import React from "react";
import {Button} from "primereact/button";

export default React.memo(({label, handleClick, disabled}) => {
    return (
        <span>
            <Button label={label} onClick={handleClick} icon="pi pi-check" style={{marginRight: '.25em'}} disabled={disabled || false}/>
        </span>
    )
})