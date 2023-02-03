import React, { useState, useEffect } from "react";

function Timer() {
    const [sec, setSec] = useState(parseInt(3));
    
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(sec) > 0){
                setSec(parseInt(sec) - 1);
            }
            if (parseInt(sec) === 0){
                clearInterval(countdown);
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [sec])

    return (
        <div className="timer">
          {{minutes}}
        </div>
    )
}
export default Timer;