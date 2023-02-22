import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreators as userActions } from "../../Redux/modules/user";
import { FormControl, Grid } from "@mui/material";
import logo from '../../assets/logo.png';
import "./Join.css";
import { Button } from '@mui/material';

function Join(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = (e) => {
    e.preventDefault();
    navigate('/');
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [checked, setChecked] = useState(false);
  const [mobile, setMobile] = useState();

  const onEmailHandler = useCallback((e) => {
    setEmail(e.target.value);
  });
  const onMobileHandler = useCallback((e) => {
    setMobile(e.target.value);
  });
  const onPasswordHandler = useCallback((e) => {
    setPassword(e.target.value);
  });
  const onConfirmPasswordHandler = useCallback((e) => {
    setConfirmPassword(e.target.value);
  });
  const onNameHandler = useCallback((e) => {
    setName(e.target.value);
  });
  const onBirthdayHandler = useCallback((e) => {
    setBirthday(e.target.value);
  });
  const onCheckedHandler = useCallback((e) => {
    setChecked(e.target.value);
  });
  const onSubmitHandler = useCallback(
    (e) => {
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
        mobile: mobile,
        checked: checked,
      };
      if (!checked){
        window.alert('이용약관을 동의해주세요.');
      }
      else{
        dispatch(userActions.registerUser(body));
      }
      // dispatch(userActions.registerUser(body)).then((res) => {
      //   if (res.payload.success) {
      //     props.history.push("/login");
      //     navigate("/login");
      //   } else {
      //     alert("Error");
      //   }
      // });
    },
    [email, password, name, birthday, mobile]
  );

  return (
    <>
      <div className="signup-header">
        <img id="logo" src={logo} onClick={goHome}></img>
      </div>
      <form id="signUp-form">
        <div className="signup-form-div">
          <div className="input-box">
            <label htmlFor="email">이메일</label>
            <div className="input-div">
              <input 
                id="email" name="email" type="email" 
                value={email}
                placeholder="username@gmail.com" required
                onChange={onEmailHandler}/>
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="password">비밀번호</label>
            <div className="input-div">
              <input 
                id="password" name="password" type="password" 
                value={password}
                placeholder="비밀번호" required
                onChange={onPasswordHandler}/>
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="password_check">비밀번호 확인</label>
            <div className="input-div">
              <input 
                id="password_check" name="password_check" type="password" 
                value={confirmPassword}
                placeholder="비밀번호 확인" required
                onChange={onConfirmPasswordHandler}/>
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="name">이름</label>
            <div className="input-div">
              <input 
                id="name" name="name" type="text" 
                value={name}
                placeholder="이름" required
                onChange={onNameHandler}/>
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="birthday">생년월일</label>
            <div className="input-div">
              <input 
                id="birthday" name="birthday" type="date" 
                value={birthday} required
                onChange={onBirthdayHandler}/>
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="mobile">휴대폰번호</label>
            <div className="input-div">
              <input 
                id="mobile" name="mobile" type="number" 
                value={mobile} required
                onChange={onMobileHandler}/>
            </div>
          </div>
          <div className="term-div">
            <p>이용약관, 개인정보 수집 및 이용,위치정보 이용약관(선택),<br/> 프로모션 안내 메일 수신(선택)에 모두 동의합니다.</p>
          </div>
        </div>
        <div className="agree_div">
          <div className="agree_inner_div">
            <input id="agree_checkbox" type="checkbox" onChange={onCheckedHandler}></input>
            <label htmlFor="check">동의합니다</label>
          </div>
        </div>
        <div className="login-btn-box">
          {email.trim() != "" && password.trim() != "" && confirmPassword.trim() != "" && birthday.trim() != "" && name.trim() != "" ? 
          <Button 
          variant="contained"
          onClick={onSubmitHandler}>회원가입</Button> :
          <Button disabled>회원가입</Button>
        }
          </div>
      </form>
      {/* <FormControl id="signup" variant="standard">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <label htmlFor="email">Email</label>
          </Grid>
          <Grid item xs={6}>
            <input
              type="email"
              value={email}
              onChange={onEmailHandler}
              className="inputtag"
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="password">Password</label>
          </Grid>
          <Grid item xs={6}>
            <input
              type="password"
              value={password}
              onChange={onPasswordHandler}
              className="inputtag"
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="confirmPassword">Password 확인</label>
          </Grid>
          <Grid item xs={6}>
            <input
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
              className="inputtag"
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="name">이름</label>
          </Grid>
          <Grid item xs={6}>
            <input
              type="text"
              value={name}
              onChange={onNameHandler}
              className="inputtag"
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="birthday">생년월일</label>
          </Grid>
          <Grid item xs={6}>
            <input
              type="text"
              value={birthday}
              onChange={onBirthdayHandler}
              className="inputtag"
            />
          </Grid>
          <Grid item xs={12}>
            <div id="term">
              이용약관, 개인정보 수집 및 이용,위치정보 이용약관(선택), 프로모션
              안내 메일 수신(선택)에 모두 동의합니다.
            </div>
          </Grid>
          <Grid item xs={12}>
            <input type="checkbox" onChange={onCheckedHandler}></input>
            <label htmlFor="check">동의합니다</label>
          </Grid>
          <Grid item xs={12}>
            <button onClick={onSubmitHandler}>회원 가입</button>
          </Grid>
        </Grid>
      </FormControl> */}
    </>
  );
}

export default Join;
