import React from "react";
import { useSelector } from "react-redux";
import "./Schedule.css";
import ScheduleItem from "./ScheduleItem";

function Schedule () {
    // 일일 일정 리스트
    const schedule = useSelector((state) => state?.mirror?.member?.calender);

    // 현재 시간
    const date = new Date()
    const current_hour = date.getHours();
    const current_minute = date.getMinutes();
    
    const new_schedule = (list) => {
      const arr = [];
      for (let i = 0; i < list.length; i++) {
        if ( !list[i].allDay ) {
          const start_hour = list[i].start.slice(11,13);
          const start_min = list[i].start.slice(14);
          // 미래의 업무
          if (start_hour > current_hour || (start_hour === current_hour && start_min > current_minute)){
            arr.push(list[i]);
          }
        }
        if (arr.length > 1) {
          return arr;
        }

      }
      for (let i = 0; i < list.length; i++) {
        // 현재 진행중인 업무 
        const end_hour = list[i].end.slice(11,13);
        const end_min = list[i].end.slice(14);
        if (end_hour > current_hour || (end_hour === current_hour && end_min > current_minute)) {
          arr.unshift(list[i]);
        }
        if (arr.length > 1) {
          return arr;
        }
      }
      list.map((x) => {
        if(x.allDay === true){
          arr.unshift(x);
        }
        if (arr.length > 1) {
          return arr;
        }
      })
    }
    let new_result;
    if (schedule.length > 0){
      new_result = new_schedule(schedule)
    }
    

    return (
      <div className="schedule-box">
        {
          new_result? 
            new_result.map((item, idx) => {
              return (
                // <React.Fragment key={idx}>
                  <ScheduleItem key={idx} item={item}/>
                // </React.Fragment>
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
