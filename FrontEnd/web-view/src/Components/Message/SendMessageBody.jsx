import { useState } from "react";
import { useSelector } from "react-redux";
import "./SendMessageBody.css";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const api = axios.create({
    baseURL : 'http://i8a201.p.ssafy.io'
  }, {withCredentials: true})
  
const SendMessageBody = () => {
    const navigate = useNavigate();

    const memberList = useSelector(state => state.user.memberList);
    const member_key = useSelector(state => state.user.member.memberKey);
    const userKey = localStorage.getItem('userKey');

    const [sendTo, setSendTo] = useState("");
    const [text, setText] = useState("");

    const changeText = (e) => {
        setText(e.target.value);
    }
    const changeSendTo = (e) => {
        setSendTo(e.currentTarget.value);
    }

    const sendMsg = (e) => {
        e.preventDefault();
        api.post('/web/sendMessage', {
            headers: {
                "user-key": userKey,
            },
            member_key_from: member_key,
            member_key_to: sendTo,
            content: text,
        }).then(() => {
            window.alert('성공적으로 메시지를 보냈습니다.');
            navigate(-1);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="send-msg-div">
            <h3 className="send-message-title">메시지 보내기</h3>
            <div className="send-to-whom-div">
                <label className="send-to-label" htmlFor="sendTo">누구에게 보내실건가요?</label>
                <div>
                  <select name="sendTo" id="sendTo" onChange={changeSendTo}>
                    <option value="">선택</option>
                    {memberList?.map((x) => {
                        return (
                            <option key={x.memberKey} value={x.memberKey}>{x.nickname}</option>
                        )
                    })}
                  </select>
                </div>
            </div>
            <div className="send-content-box">
                <p>메시지 작성</p>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="메시지 내용을 작성해주세요." id="floatingTextarea2" 
                    onChange={changeText}
                    style={{height: "150px", width:"95%", margin:"auto", paddingTop:".625rem"}}></textarea>
                    {/* <label htmlFor="floatingTextarea2"
                    style={{paddingLeft:"2rem"}}>Message</label> */}
                </div>

            </div>
            <div>
                {
                    text.trim() != '' && sendTo != "" ? 
                    <Button variant="contained" onClick={sendMsg}>보내기</Button>
                    : <Button disabled>보내기</Button> 
                }
            </div>
        </div>
    )
}

export default SendMessageBody;