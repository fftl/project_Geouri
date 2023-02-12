import React, { useState } from "react";
import "./Schedule.css";
import ScheduleItem from "./ScheduleItem";

function Schedule () {
    // const schedule = useState((state) => state?.mirror?.member?.calendar);

    const schedule = [
      {
        'content': '미용실',
        'date': '2023-02-12',
        'time': '17:59',
      },
      {
        'content': '네일아트',
        'date': '2023-02-12',
        'time': '22:00',
      },
      {
        'content': '본앤브레드',
        'date': '2023-02-12',
        'time': '23:00',
      },
    ]
    
    const date = new Date()
    const current_hour = date.getHours();
    const current_minute = date.getMinutes();

    function is_urgent(hr, min) {
      return (hr > current_hour || hr == current_hour && min >= current_minute)
    }

    function filterByTime(item) {
      const hour = item.time.slice(0,2);
      const minute = item.time.slice(3);

      if(is_urgent(hour, minute)){
        return true;
      }
      return false;
    }
    const new_schedule = schedule.filter(filterByTime).slice(0,2);

    return (
      <div className="schedule-box">
        {
          new_schedule? 
            new_schedule.map((item) => {
              return (
                <ScheduleItem item={item}/>
              )
            })
          :
          <div className="schedule-box">
            <p className="no-schedule">오늘은 일정이 없습니다.</p>
          </div>
        }
      </div>
    )
}

export default Schedule; 
