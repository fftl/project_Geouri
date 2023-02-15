import './AddMirror.css';
import React from 'react';
import mirror_icon from "../../assets/mirror_icon.png";

const AddMirrorComp = () => {

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
                <div className="input-div">
                    <input type="text" id="add-mirror-input"/>
                </div>
                <div className="btn-div">
                    <button type="button" className="btn btn-dark" id="add-btn">등록</button>
                    <button className="add-nextTime-btn">다음에</button>
                </div>
            </div>
        </div>
    )
}

export default AddMirrorComp;