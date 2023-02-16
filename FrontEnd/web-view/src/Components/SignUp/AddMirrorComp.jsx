import './AddMirror.css';
import React, { useCallback, useState } from 'react';
import mirror_icon from "../../assets/mirror_icon.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterMirror, userActions } from '../../Redux/modules/user';

const AddMirrorComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userKey = localStorage.getItem("userKey");
    const [serial, setSerial] = useState("");

    const onReset = useCallback(() => {
        setSerial("");
    }, [serial])

    const changeValue = (e) => {
        setSerial(e.target.value);
    }

    const register = async (e) => {
        e.preventDefault();
        //redux에 serial number 저장
        try {
            await dispatch(asyncRegisterMirror(userKey, serial)).unwrap();
            window.alert('거울이 성공적으로 등록되었습니다.');
            navigate("/");
        } catch (err) {
            window.alert('거울의 시리얼 넘버를 확인해주세요.');  
            onReset();
        }
    }

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div className='container'>
            <div className="mirror-icon-box">
            <img 
                className="mirror-icon"
                src={mirror_icon} alt="mirror_icon"/>
            </div>
            <div className="add-mirror-box">
                <p className="add-mirror-title">거울 등록</p>
                <p className="add-mirror-desc">거울 하단에 있는 거울 시리얼 넘버를 작성해주세요.</p>
                <div className="add-mirror-input-div">
                    <input 
                        type="text" 
                        id="add-mirror-input"
                        onChange={changeValue}/>
                </div>
                <div className="btn-div">
                    <button 
                        onClick={register}
                        type="button" 
                        className="btn btn-dark" 
                        id="add-btn">등록</button>
                    <button 
                        onClick={goToHome}
                        type="button" 
                        id="add-nextTime-btn"
                        className="btn btn-outline-secondary">다음에</button>
                </div>
            </div>
        </div>
    )
}

export default AddMirrorComp;