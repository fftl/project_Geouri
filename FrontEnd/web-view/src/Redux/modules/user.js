import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleActions } from "redux-actions";
// import { createAction, handleActions } from "redux-actions";

//Action TYPE
const LOGIN = "user/LOGIN";

// Action creator
const login = createAction(LOGIN);

//InitialState
const initialState = {
  user: null,
  is_login: false,
  status: "idle",
};

//middleware - 비동기 작업
export const asyncLogin = createAsyncThunk(
  // type
  "userSlice/asyncLogin",
  // function
  async (userInfo) => {
    const email = userInfo.email;
    const password = userInfo.password;

    // 여기에서 api 통신
    const response = await axios.get("/dfsfsd", email, password);
    // const response = await userAPI.loginDB(email.password);

    // login하면 user 정보랑 token 줌
    const user = response.data.user;
    const jwt = user.token;
    sessionStorage.setItem("jwt", jwt);
    //sessionStorage와 localStorage의 차이점
    return user;
  }
);

//reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLogin: (state) => {
      if (localStorage.getItem("token")) {
        state.is_login = true;
      } else {
        state.is_login = false;
      }
    },
  },
  // 비동기 작업의 reducers
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.pending, (state, action) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    });
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      if (state.status === "pending" && state.is_login === false) {
        state.status = "idle";
        state.is_login = true;
        state.user = action.payload.user;
      }
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    });
  },
});

const userReducer = handleActions({
  [LOGIN]: (state, action) => ({ user: state.user }),
});
function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "user/LOGIN": {
      console.log(action);
      return { ...state, user: action.type };
    }
    case "user/SIGNUP": {
      return { ...state, register: action.payload };
    }
    default:
      return state;
  }
}

const actionCreators = {
  login,
  signup,
};

export { actionCreators };

export const userActions = userSlice.actions;
export default userSlice.reducer;
