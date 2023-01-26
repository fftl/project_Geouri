import React from "react";

function Youtube(props){
    const { playList } = props;
    playList.map((x) => console.log(x));
}

export default Youtube;