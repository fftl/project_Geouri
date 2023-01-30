import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  actionCreators,
  actionCreators as userActions,
} from "../Redux/modules/user";
import "../Components/SignUp/SignUp.css";

function SignUp(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [checked, setChecked] = useState(false);

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onNameHandler = (e) => {
    setName(e.target.value);
  };
  //생년월일 8자리로 입력 받을건지?? String?
  const onBirthdayHandler = (e) => {
    setBirthday(e.target.value);
  };
  const onCheckedHandler = () => {
    setChecked(!checked);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다!");
    }

    let body = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
      birthday: birthday,
      checked: checked,
    };

    dispatch(actionCreators.signup(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={onSubmitHandler} className="signup-form">
        <div className="signup-form-email">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={onEmailHandler} />
        </div>
        <div className="signup-form-password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={onPasswordHandler}
          />
        </div>
        <div className="signup-form-confirmPassword">
          <label htmlFor="confirmPassword">Password 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
          />
        </div>
        <div className="signup-form-name">
          <label htmlFor="name">이름</label>
          <input type="text" value={name} onChange={onNameHandler} />
        </div>
        <div className="signup-form-birthday">
          <label htmlFor="birthday">생년월일</label>
          <input type="text" value={birthday} onChange={onBirthdayHandler} />
        </div>
        <br />
        <div className="terms">
          이용약관, 개인정보 수집 및 이용,위치정보 이용약관(선택), 프로모션 안내
          메일 수신(선택)에 모두 동의합니다.
        </div>
        <div className="signup-form-agree">
          <input id="agree" type="checkbox" onChange={onCheckedHandler}></input>
          <label htmlFor="agree">동의합니다</label>
        </div>
        <button onClick={onSubmitHandler}>회원 가입</button>
      </form>
    </div>
  );
}

export default SignUp;
