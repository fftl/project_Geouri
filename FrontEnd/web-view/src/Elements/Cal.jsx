import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import mark from "mark";
import "./dot.css";

const Cal = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        maxDetail="month"
        formatDay={(locale, date) => moment(date).format("DD")}
        className="mx-auto w-full text-sm border-b"
        // tileContent={({ date, view }) => {
        //   if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
        //     return (
        //       <>
        //         <div className="flex justify-center items-center absoluteDiv">
        //           <div className="dot"></div>
        //         </div>
        //       </>
        //     );
        //   }
        // }}
      />
    </div>
  );
};

export default Cal;
