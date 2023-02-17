import React, { useRef, useState } from "react";
import { HomeHeader } from "../Components";
import defaultImage from '../assets/default.jpg';
import { borderRadius } from "@mui/system";
import { Image } from "../Elements";
import axios from "axios";
import { useNavigate } from "react-router";

const AddMember = () => {
    const navigate = useNavigate();
    const api = axios.create({
        baseURL : 'http://i8a201.p.ssafy.io'
    }, {withCredentials: true})

    const [base64Image, setBase64Image] = useState(defaultImage);
    const [imageUrl, setImageUrl] = useState("");
    const [kidsMode, setKidsMode] = useState(false);
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState();

    const changeKidsMode = () => {
        setKidsMode(!kidsMode);
    }
    const handleNameInput = (e) => {
        setName(e.target.value);
    }
    const handleNicknameInput = (e) => {
        setNickname(e.target.value);
    }
    const handleDateInput = (e) => {
        setBirthday(e.target.value);
    }

    const inputRef = useRef();
    const handleClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    }
    const reader = new FileReader();
    const encodeFileToBase64 = (fileBlob) => {
        reader.readAsDataURL(fileBlob);
        return new Promise((reseolve) => {
        reader.onload = () => {
            setBase64Image(reader.result);
    }
        })
    }
    
    const addMember = (e) => {
        e.preventDefault();
        const data = {
            'imageUrl' : imageUrl,
            'kidsMode' : kidsMode,
            'name' : name,
            'nickname' : nickname,
            'birthday' : birthday,
        }
        console.log(data);

        const userKey = localStorage.getItem('userKey');
        
        api.post('/web/member', {
            headers: {
                "user-key": userKey,
            },
            data:data,
        }).then((res) => {
            console.log(res.data);
            window.alert('성공적으로 멤버가 등록되었습니다. ');
            navigate('/');
        }).catch((err) => {
            console.log(err);
            window.alert('멤버 등록을 실패하였습니다.');
        })
    }

    return (
        <div className="container">
            <HomeHeader type="BasicHeader" />
            <form action="">
            <div className="add-member-div">
                <div className="add-member-img-div"
                    style={{marginBottom:'2rem'}}>
                    <Image type="member" 
                        src={base64Image}
                        onClick={handleClick}/>
                    <input 
                        ref={inputRef}
                        type="file" 
                        onChange={(e) => {
                            encodeFileToBase64(e.target.files[0]);
                            setImageUrl(e.target.files[0]);}}
                        style={{display:'none'}}/>
                </div>
                <div className="input-box">
                    <label htmlFor="name">이름</label>
                    <div className="input-div">
                        <input type="text" name="name" id="name" placeholder="이름" required
                            onChange={handleNameInput}/>
                    </div>
                </div>
                <div className="input-box">
                    <label htmlFor="nickname">별명</label>
                    <div className="input-div">
                        <input type="text" name="nickname" id="nickname" placeholder="별명" required
                            onChange={handleNicknameInput}/>
                    </div>
                </div>
                <div className="input-box">
                    <label htmlFor="birthday">생년월일</label>
                    <div className="input-div">
                        <input type="date" name="birthday" id="birthday" required
                            onChange={handleDateInput}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="kidsMode">
                        {kidsMode? 
                        <label className="toggle-label link-label">
                            <span className="widget-title">아이모드</span>
                            <input 
                            type="checkbox" 
                            role="switch"
                            defaultChecked
                            onChange={changeKidsMode}/>
                        </label>:
                        <label className="toggle-label link-label">
                            <span className="widget-title">아이모드</span>
                            <input 
                            type="checkbox" 
                            role="switch"
                            onChange={changeKidsMode}/>
                        </label>
                        }
                    </label>
                </div>
                <div 
                    style={{marginTop:"4rem"}}
                    className="add-member-btn-div">
                    <button 
                        onClick={addMember}
                        style={{width:'80%'}} 
                        type="button" 
                        className="btn btn-dark">등록</button>
                </div>  
            </div>
            </form>
        </div>
    )
}
 
export default AddMember;