import React from "react";

function Text(props){
    const { children } = props;
    console.log(children);
    return (
        <p>
            { children }
        </p>
    )   
}

export default Text;