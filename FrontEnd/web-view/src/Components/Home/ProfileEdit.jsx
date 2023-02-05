import React from "react";
import { useState, useSelector } from "react";
import { Switch, Grid, FormControl } from "@mui/material/";
import "./ProfileEdit.css";
import { Button, Image, Text } from "../../Elements/index";

const ProfileEdit = (props) => {
  const { member } = props;
  const [kidsmode, setKidsmode] = useState(false);
  const [youtube, setYoutube] = useState(false);
  const [news, setNews] = useState(false);
  const [cal, setCal] = useState(false);
  const [photo, setPhoto] = useState(false);

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
  const handlePhotoChange = (event) => {
    setPhoto(event.target.checked);
    event.preventDefault();
  };
  const handleClick = () => {};
  const submitHandler = () => {};
  const deleteHandler = () => {};

  return (
    <div>
      {/* <Image src={member.image} />
      <Text>{member.name}</Text> */}
      <img src="../../assets/edit.png" alt="edit" />

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
          <Grid item xs={6}>
            <label htmlFor="photo" id="photo">
              사진 촬영
            </label>
          </Grid>
          <Grid item xs={6}>
            <Switch
              photo={photo}
              onChange={handlePhotoChange}
              inputProps={{ "aria-label": "controlled" }}
            />
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
