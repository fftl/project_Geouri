import React, { useState } from "react";
import { useDispatch } from "react-redux";

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
  const onCheckedHandler = (e) => {
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

    // dispatch(로그인 넣을 부분(body)).then((res) => {
    //   if (res.payload.success) {
    //     props.history.push("/login");
    //   } else {
    //     alert("Error");
    //   }
    // });
  };

  return (
    <div>
      <form>
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <label>Password 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <div>
          이용약관, 개인정보 수집 및 이용,위치정보 이용약관(선택), 프로모션 안내
          메일 수신(선택)에 모두 동의합니다.
        </div>
        <input type="checkbox" onChange={onCheckedHandler}>
          동의합니다
        </input>
        <button onClick={onSubmitHandler}>회원 가입</button>
      </form>
    </div>
  );
}

export default SignUp;
