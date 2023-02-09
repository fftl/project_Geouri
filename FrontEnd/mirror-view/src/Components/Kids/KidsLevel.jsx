import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.css";
import "./KidsLevel.css";

const KidsLevel = (props) => {
  const [level, setLevel] = useState();
  const [point, setPoint] = useState();
  //   const { member } = props;
  // 멤버의 경험치, 레벨 데이터 수신받음
  // const pointNow = {member.point}
  // const levelNow = {member.level}

  //   useEffect(() => {
  // setLevel(pointNow);
  // setPoint(levelNow);
  //   }, []);
  const pointNow = 40;
  const memlevel = "lv0";

  return (
    <div>
      <div className="chaimg">
        <img
          src={process.env.PUBLIC_URL + `/images/lv/${memlevel}.png`}
          alt="캐릭터"
          id="levcha"
        />
        <ProgressBar id="levelBar" animated now={pointNow} />
      </div>
    </div>
  );
};

export default KidsLevel;
