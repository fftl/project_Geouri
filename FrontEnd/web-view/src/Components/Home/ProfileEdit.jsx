import React, { useCallback } from "react";
import { useState, useSelector, useEffect } from "react";
import { Switch, Grid, FormControl } from "@mui/material/";
import "./ProfileEdit.css";
import { Button, Image, Text } from "../../Elements/index";
import editimg from "../../assets/edit.png";
import axios from "axios";
import { useNavigate } from "react-router";


const ProfileEdit = (props) => {
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  const { member } = props;

  const [kidsmode, setKidsmode] = useState(false);
  const [youtube, setYoutube] = useState(false);
  const [news, setNews] = useState(false);
  const [cal, setCal] = useState(false);
  const [nickname, setNickname] = useState("엄마");
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL= '../../assets/default.jpg'
  })

  const handleKidsmodeChange = (event) => {
    setKidsmode(event.target.checked);
    event.preventDefault();
  };
  const handleYoutubeChange = (event) => {
    setYoutube(event.target.checked);
    event.preventDefault();
  };
  const handleNewsChange = (event) => {
    setNews(event.target.checked);
    event.preventDefault();
  };
  const handleCalChange = (event) => {
    setCal(event.target.checked);
    event.preventDefault();
  };
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
    console.log(isEdit);
  };

  const changeNick = (e) => {
    setNickname(e.target.value);
  };

  const inputNick = (e) => {
    console.log(e.target.value);
  };

  const handleClick = () => {};
  const submitHandler = () => {};
  const deleteHandler = () => {};

  useEffect(() => {
    const getNickname = async () => {
      const { data } = await axios.get("");
      return data;
    };
    getNickname().then((result) => {
      setNickname(result.nick);
      setImage({...image, preview_URL:''})
    });
  }, []);

  const canSubmit = useCallback(()=>{
    return nickname !== "";
  },[nickname]);



  return (
    <div>
      {/* <Image src={member.image} />
      <Text>{member.name}</Text> */}
      <img src={editimg} alt="edit" onClick={toggleIsEdit} />
      <div className="nick">
        {isEdit ? (
          <>
            <input value={nickname} onChange={changeNick} />
          </>
        ) : (
          <>{nickname}</>
        )}

        {isEdit ? (
          <>
            <button onClick={changeNick}>수정</button>
            <button onClick={toggleIsEdit}>수정 취소</button>
          </>
        ) : null}
      </div>
      <FormControl id="profileEdit" variant="standard">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <label htmlFor="kidsmode" id="kidsmode">
              아이모드
            </label>
          </Grid>
          <Grid item xs={6}>
            <Switch
              kidsMode={kidsmode}
              onChange={handleKidsmodeChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>

          {/* <br /> */}
          <Grid item xs={6}>
            <label htmlFor="youtube" id="youtube">
              Youtube
            </label>
          </Grid>
          <Grid item xs={6}>
            <Switch
              youtube={youtube}
              onChange={handleYoutubeChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>

          <Grid item xs={6}>
            <label htmlFor="playlist" id="plist">
              재생목록 링크
            </label>
          </Grid>
          <Grid item xs={6}>
            <input
              type="text"
              placeholder="https://www.youtube.com/playlist?"
              className="inputtag"
            />
          </Grid>

          <Grid item xs={6}>
            <label htmlFor="news" id="news">
              뉴스/기사
            </label>
          </Grid>
          <Grid item xs={6}>
            <Switch
              news={news}
              onChange={handleNewsChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="cal" id="cal">
              캘린더
            </label>
          </Grid>

          <Grid item xs={6}>
            <Switch
              cal={cal}
              onChange={handleCalChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="calink" id="calink">
              링크
            </label>
          </Grid>
          <Grid item xs={6}>
            <input type="text" className="inputtag" />
          </Grid>

          <Grid item xs={12}>
            <button id="photobook" onClick={handleClick}>
              사진첩
            </button>
          </Grid>
          <Grid item xs={6}>
            <button id="register" onSubmit={submitHandler}>
              등록
            </button>
          </Grid>
          <Grid item xs={6}>
            <button id="delete" onSubmit={deleteHandler}>
              삭제
            </button>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
};
export default ProfileEdit;
