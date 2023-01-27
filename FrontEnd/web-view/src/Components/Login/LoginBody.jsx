import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from "../../Redux/modules/user";
import "./Login.css";

// 아이디, 비밀번호 input, 자동로그인 input, login btn
function LoginBody(){
    const [errorMsg, setErrorMsg] = useState("");
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const {email, password} = inputs;

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [checkAutoLogin, setCheckAutoLogin] = useState(false);

    const onReset = () => {
        setInputs({
            email: '',
            password: '',
        })
    }
    const dispatch = useDispatch();
    
    const onClick = () => {
        const userInfo = {
            email : inputs.email,
            password : inputs.password,
        }   
        dispatch(userActions.login(userInfo));

    }

    // email 유효성 검사해야해
    // const renderErrorMessage = (name) =>
    //     name === errorMessages.name && (
    //         <div className="error">{errorMessages.message}</div>
    //     );

    return (
        <>
            <form action="" id="login-form">
                <div className="login-form-div">
                    <div className="input-box">
                        <label htmlFor="email">이메일</label>
                        <input id="email" type="email" placeholder="username@email.com" required
                            onChange={(e) => {
                                const {value, email} = e.target;
                                setInputs({
                                    ...inputs,
                                    [email] : value
                                })
                            }}/>
                        {/* {renderErrorMsg(email)} */}
                    </div>
                    <div className="input-box">
                        <label htmlFor="pwd">비밀번호</label>
                        <input id="pwd" type="password" placeholder="비밀번호" required
                            onChange={(e) => {
                                const {value, password} = e.target;
                                // 리액트에서 객체를 업데이트하게 될 때에는 기존 객체를 직접 수정하면 안되고, 새로운 객체를 만들어서, 새 객체에 변화를 주어야 됩니다.
                                setInputs({
                                    ...inputs,
                                    [password] : value
                                })
                            }}/>
                    </div>
                    <div className="autoLogin-box">
                        <input id="autoLogin" type="checkbox" 
                            onChange={(e) => {setCheckAutoLogin(!checkAutoLogin)}}/>
                        <label htmlFor="autoLogin">자동 로그인</label>
                    </div>
                    <div className="login-btn-box">
                        <button onClick={onClick}>로그인</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LoginBody;