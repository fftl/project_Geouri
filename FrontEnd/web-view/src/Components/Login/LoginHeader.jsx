import React from "react";
import "./Login.css";
import logo from '../../assets/logo.png';

// 로고가 들어갈 부분
function LoginHeader(){
    return (
        <div className="login-header">
          <img id="logo" src={logo}></img>
        </div>
    )
}

export default LoginHeader;