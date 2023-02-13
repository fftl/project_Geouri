import React from "react";

const ScheduleItem = ({ item }) => {
  const content = item?.title;
  const allDay = item?.allDay;
  let start_hour;
  let start_min;
  let end_hour;
  let end_min;
  if ( !allDay ){
    start_hour = item?.start.slice(11,13);
    start_min = item?.start.slice(14);
    end_hour = item?.end.slice(11,13);
    end_min = item?.end.slice(14);
  }
        
  const amOrPm = (h) => {
    if (h === 24) {
      return `오전 0`;
    }
    if (h === 12) {
      return `오후 ${h}`;
    }
    if (h > 12) {
      return `오후 ${h - 12}`;
    }
    return `오전 ${h}`;
  };

  return (
    <>
      <div className="schedule-grid-box">
        <div className="bar"></div>
        <div className="schedule-grid">
          <div className="schedule-time">
            { allDay?
              <p>하루종일</p>
              :
              <p>
                {amOrPm(start_hour)}시 {start_min}분 ~ {amOrPm(end_hour)}시 {`${end_min}분`}
              </p>

            }
          </div>
          <div className="schedule-content">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScheduleItem;
