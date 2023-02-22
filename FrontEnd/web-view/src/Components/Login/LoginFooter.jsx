import React from "react";
import { Link } from 'react-router-dom';
import "./Login.css";

function LoginFooter(){
    return (
        <>
            <div className="login-link">
                <Link to="/signup">아직 회원이 아니세요?</Link>
            </div>
            {/* <div className="login-link">   
                <Link to="/find-user">아이디/비밀번호 찾기</Link>
            </div>                 */}
        </>
    )
}

export default LoginFooter;