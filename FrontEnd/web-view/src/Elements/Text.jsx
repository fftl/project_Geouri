import React from "react";

function Text(props){
    const { children } = props;
    return (
        <p style={{display:"flex"}}>
            { children }
        </p>
    )   
}

export default Text;