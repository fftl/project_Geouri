import { HomeHeader, SendMessageBody } from "../Components";
import React from "react";

const SendMessage = () => {
    return(
        <>
            <div className="container">
                <HomeHeader type="BasicHeader"/>
                <SendMessageBody />
            </div>
        </>
    )
}

export default SendMessage;