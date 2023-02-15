import { createSlice } from "@reduxjs/toolkit";

const mirrorSlice = createSlice({
  name: "mirror",
  initialState: {
    member: {
      memberKey: "",
      nickname: "",
      birth: "",
      kidsMode: false,
      widget: {
        news: true,
        playlist: false,
        shot: false,
        calender: false,
      },
      playlist:
        "",
      calender:[],
      region: {
        sidoName: "",
        gugunName: "",
        dongName: "",
        lng: 0,
        lat: 0,
      },
      news: [],
    },
    message: "",
    content: "",
    action: "",
    alertMsg: "",
    level: null,
    point: null,
    levelUp: null,
    image: '',
  },

  reducers: {
    getMember(state, action) {
      state.member = action.payload;
    },

    getMessage(state, action) {
      state.action = action.payload.cmd;
      state.message = action.payload.content;
    },

    getAction(state, action) {
      state.action = action.payload.cmd;
      state.content = action.payload.content;
    },

    getAlertMsg(state, action) {
      state.action = action.payload.cmd;
      state.alertMsg = action.payload.content;
    },

    delMessage(state) {
      state.action = "";
      state.message = "";
      state.alertMsg = "";
    },

    leaveMirror(state) {
      state.member = {};
      state.message = "";
      state.content = "";
      state.action = "";
      state.image = "";
    },
    getPhoto(state, action){
      state.action = action.payload.cmd;
      state.image = action.payload.content;
    },
    getLev(state, action) {
      state.level = action.payload.lv;
      state.point = action.payload.exp;
      state.levelUp = action.payload.levelUp;
    },
  },
});

export const mirrorActions = mirrorSlice.actions;
export default mirrorSlice.reducer;
