import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.css";
import "./KidsLevel.css";
import axios from "axios";

const KidsLevel = () => {
  const [level, setLevel] = useState("lv0");
  const [point, setPoint] = useState(0);
  const [prevLevel, setPrevLevel] = useState(0);

  useEffect(() => {
    axios
      .get("주소")
      .then((response) => {
        setLevel(response.data);
        setPoint(response.data);
        setPrevLevel(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (JSON.stringify(level) !== JSON.stringify(prevLevel)) {
      console.log("레벨업");
      setPrevLevel(level);

      const script = document.createElement("script");
      script.src =
        "https://tistory4.daumcdn.net/tistory/3134841/skin/images/confetti_v2.js";
      script.async = true;
      document.body.appendChild(script);

      return <div className="canvas"></div>;
    }
  }, [level]);

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
          src={process.env.PUBLIC_URL + `/images/lv/${level}.png`}
          alt="캐릭터"
          id="levcha"
        />
        <ProgressBar id="levelBar" animated now={point} />
      </div>
    </div>
  );
};

export default KidsLevel;
