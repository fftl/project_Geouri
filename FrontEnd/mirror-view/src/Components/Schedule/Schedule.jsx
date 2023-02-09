import React, { useState } from "react";
import "./Schedule.css";
import ScheduleItem from "./ScheduleItem";

function Schedule () {
    const schedule = useState((state) => state?.mirror?.member?.calendar);
    
    const date = new Date()
    const current_hour = date.getHours();
    const current_minute = date.getMinutes();

    const new_schedule = schedule.filter((sch) => {
      return (
        sch.hour > current_hour || 
        ( 
          sch.hour === current_hour && sch.minute >= current_minute
        )
      )
    }).slice(0, 5);

    return (
        <>
          {new_schedule ? 
            new_schedule.map((item) => {
            <div className="schedule-box">
                <ScheduleItem item={item} index={item.index}/>
            </div>
          }) : 
           <div className="schedule-box">
            <p className="no-schedule">오늘은 일정이 없습니다.</p>
           </div>
          }
        </>
    )
}

export default Schedule; 
