import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Schedule.css";
import ScheduleItem from "./ScheduleItem";

function Schedule () {
    // 일일 일정 리스트
    const schedule = useSelector((state) => state?.mirror?.member?.calendar);
    console.log(schedule)

    // 현재 시간
    const date = new Date()
    const current_hour = date.getHours();
    const current_minute = date.getMinutes();

    // all-day, non-all-day 구분하기
    const allDay = schedule.filter((x) => x.allDay === true); 
    const nonAllDay = schedule.filter((x) => x.allDay === false); 

    console.log(allDay)
    console.log(nonAllDay)

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
            new_schedule.map((item, idx) => {
              return (
                <ScheduleItem item={item} idx={idx}/>
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
