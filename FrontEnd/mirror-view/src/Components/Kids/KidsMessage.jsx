import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSelector } from "react-redux";

const KidsMessage = () => {
  const member = useSelector((state) => state?.mirror?.member);
  const msgCnt = member?.messageCnt;
  const msgStyle = { display: "flex", float: "right" };
  return (
    <div style={msgStyle}>
      <MailOutlineIcon />
      {msgCnt}
    </div>
  );
};

export default KidsMessage;
