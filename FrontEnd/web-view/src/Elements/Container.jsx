import React from "react";

function Container(props){
    const { children, type } = props;
    if (type === 'app'){
        return (
            <div className="app_div">
                { children }
            </div>
        )   

    }
}

export default Container;