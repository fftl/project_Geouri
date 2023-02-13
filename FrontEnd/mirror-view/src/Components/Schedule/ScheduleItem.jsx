import React from "react";

const ScheduleItem = ({ item, index }) => {
  const content = item?.content;
  const hour = Number(item?.time.slice(0, 2));
  const minute = Number(item?.time.slice(3));
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
      <div
        className={
          index === 0
            ? "schedule-active schedule-grid-box"
            : "schedule-grid-box"
        }
      >
        <div className="bar"></div>
        <div className="schedule-grid">
          <div className="schedule-time">
            <p>
              {amOrPm(hour)}시 {minute === "00" ? null : `${minute}분`}
            </p>
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
