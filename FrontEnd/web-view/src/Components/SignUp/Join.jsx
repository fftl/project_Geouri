import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreators as userActions } from "../../Redux/modules/user";
import { FormControl, Grid } from "@mui/material";
import "./Join.css";

function Join(props) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [checked, setChecked] = useState(false);

  const onEmailHandler = useCallback((e) => {
    setEmail(e.target.value);
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
  //생년월일 8자리로 입력 받을건지?? String?
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
        checked: checked,
      };

      // dispatch(userActions.registerUser(body)).then((res) => {
      //   if (res.payload.success) {
      //     props.history.push("/login");
      //     navigate("/login");
      //   } else {
      //     alert("Error");
      //   }
      // });
    },
    [email, password, name]
  );

  return (
    <div>
      <FormControl id="signup" variant="standard">
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
      </FormControl>
    </div>
  );
}

export default Join;
