import React from "react";
import { Link } from 'react-router-dom';
import "./Login.css";

function LoginFooter(){
    return (
        <>
            <div>
                <div>
                    <Link to="/signup">아직 회원이 아니세요?</Link>
                </div>
                <div>   
                    <Link to="/find-user">아이디/비밀번호 찾기</Link>
                </div>                
            </div>
        </>
    )
}

export default LoginFooter;