import { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { asyncLogin } from '../../Redux/modules/user';
import { Button } from '@mui/material';
import "./Login.css";

// [영어와 숫자 포함]@[영문만].[영문만 2~3글자] 
let regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

// 아이디, 비밀번호 input, 자동로그인 input, login btn
function LoginBody(){
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const [errMsg, setErrMsg] = useState("");
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const {email, password} = inputs;

    const [checkAutoLogin, setCheckAutoLogin] = useState(false);

    const onReset = useCallback(() => {
        setInputs({
            email: '',
            password: '',
        })
    }, [email, password])


    const handleClick = async (e) => {
        e.preventDefault();
        
        const userInfo = {
            'email' : inputs.email,
            'password' : inputs.password,
        }
        dispatch(asyncLogin(userInfo))
            .then(() => {
                navigate('/');
            })
        
    }
    
    return (
        <>
            <form action="" id="login-form">
                <div className="login-form-div">
                    <div className="input-box">
                        <label htmlFor="email">이메일</label>
                        <div className="input-div">
                        <input id="email" name="email" type="email" placeholder="username@email.com" required
                            onChange={ async(e) => {
                                const { value, name } = e.target;
                                setInputs({
                                    ...inputs,
                                    [name] : value,
                                })
                                if (! regex.test(value)){
                                    setErrMsg("이메일이 올바르지 않습니다.");
                                } else {
                                    setErrMsg("");
                                }
                            }}/>
                            
                        </div>
                    </div>
                    {errMsg ? 
                        <div className="errorEmail">{errMsg}</div>   :
                        <div className="noErrEmail"></div>
                    }
                    <div className="input-box">
                        <label htmlFor="pwd">비밀번호</label>
                        <div className="input-div">
                        <input id="pwd" name="password" type="password" placeholder="비밀번호" required
                            onChange={(e) => {
                                const {value, name} = e.target;
                                // 리액트에서 객체를 업데이트하게 될 때에는 기존 객체를 직접 수정하면 안되고, 새로운 객체를 만들어서, 새 객체에 변화를 주어야 됩니다.
                                setInputs({
                                    ...inputs,
                                    [name] : value
                                })
                                console.log(inputs)
                            }}/>
                        </div>
                    </div>
                    <div className="autoLogin-box">
                        <input id="autoLogin" type="checkbox" 
                            onChange={(e) => {setCheckAutoLogin(!checkAutoLogin)}}/>
                        <label style={{marginLeft:'1rem'}} htmlFor="autoLogin">자동 로그인</label>
                    </div>
                    <div className="login-btn-box">
                        { regex.test(inputs.email) && inputs.password.trim() != '' ? 
                         <Button variant="contained" onClick={handleClick}>로그인</Button>
                         : <Button disabled>로그인</Button> 
                        }
                    </div>
                </div>
            </form>
        </>
    )
}

export default LoginBody;