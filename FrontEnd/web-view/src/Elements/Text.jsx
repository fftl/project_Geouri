import React from "react";

function Text(props){
    const { children, is_flex } = props;

    if (is_flex) {
        return (
            <p style={'display:flex'}>
                { children }
            </p>
        )    
    }
    return (
        <p>
            { children }
        </p>
    )   
}

export default Text;