import React, { useState } from "react";
import "./Schedule.css";
import ScheduleItem from "./ScheduleItem";

function Schedule () {
    // const schedule = useState((state) => state?.mirror?.member?.calendar);

    const schedule = [
      {
        'content': '본앤브레드',
        'date': '2023-02-12',
        'time': '13:00',
      },
      {
        'content': '미용실',
        'date': '2023-02-12',
        'time': '16:00',
      },
      {
        'content': '네일아트',
        'date': '2023-02-12',
        'time': '18:00',
      },
    ]
    
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
    }).slice(0, 3);

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
