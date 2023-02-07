import React, { useState } from "react";
import "./Schedule.css";

function Schedule () {
    const schedule = useState((state) => state?.mirror?.member?.calendar);
    
    return (
        <>
          {schedule.map((item) => {
            <div>
                {item}
            </div>
          })}
        </>
    )
}

export default Schedule; 
