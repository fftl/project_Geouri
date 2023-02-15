import React from "react";

function Text(props){
    const { children } = props;
    return (
        <p>
            { children }
        </p>
    )   
}

export default Text;