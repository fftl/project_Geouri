import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./dot.css";
import axios from "axios";

import mock from "./mock.json";

const Cal = (props) => {
  const [value, onChange] = useState(new Date());
  const [brushLog, setBrushLog] = useState();
  const { member } = props;
  const url = mock;
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const [mark, setMark] = useState([]);

  async function getLog() {
    // try {
    //   const request = await axios.post(url, {
    //     memberKey: { member },
    //     year: { year },
    //     month: { month },
    //   });
    // } catch (error) {
    //   console.log("실패");
    // }

    axios
      .get(url, {
        params: {
          // memberKey: { member },
          // year: { year },
          // month: { month },
        },
      })
      .then(function (response) {
        console.log(response);
        setBrushLog(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // const loglist = brushLog.filter(
  //   (brushLog) => brushLog.year === { year },
  //   brushLog.month === { month }
  // );
  // useEffect(() => {
  //   async function test() {
  //     await axios
  //       .get(
  //         "https://74716c1e-67aa-44f2-997e-e49f202781b6.mock.pstmn.io/brushcal"
  //       )
  //       .then((result) => {
  //         console.log(result.data.id);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   test();
  // });

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
