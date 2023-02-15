import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 중복된 주소를 줄이는 방법
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true; // front, back 간 쿠키 공유

//Action TYPE
const LOGIN = "user/LOGIN";
export const REGISTER_USER = "user/REGISTER_USER";

// Action creator
const login = createAction(LOGIN);
const registerUser = createAction(REGISTER_USER);

//InitialState
const initialState = {
  user: null,
  is_login: false,
  status: "idle",
  signupDone: false,
  isJoining: false,
  signupError: "",
};

// 여기에서 백이랑 api통신을 해서 데이터를 받아옴 -> extraReducer : reducer을 만들어서 state저장해.
const api = axios.create({
  baseURL : 'http://i8a201.p.ssafy.io'
}, {withCredentials: true})


//middleware - 비동기 작업
export const asyncLogin = createAsyncThunk(
  // type
  "userSlice/asyncLogin",
  // function
  async (userInfo) => {
    const email = userInfo.email;
    const password = userInfo.password;
    
    const navigate = useNavigate();

    // 여기에서 login api 통신
    await api.post("/login", {
      email: email, 
      password: password
    })
    .then((res) => {
      const user = res.data.member;
      const jwt = user.token;
      localStorage.setItem("jwt", jwt);
      userSlice.reducer.isLogin();
      navigate('/');
  })
    .catch((err) => {
      console.log("login : error ", err.response);
    }) ;
  }
);

//reducer
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLogin: (state) => {
      if (localStorage.getItem("jwt")) {
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
    builder.addCase(signup.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log(action.payload);
      state.signupDone = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.signupError = action.payload;
    });
  },
});

//영현이~

export const signup = createAsyncThunk(
  "userSlice/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/signup", data);
      
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// const userReducer = handleActions({
//   [LOGIN]: (state, action) => ({ user: state.user }),
//   [REGISTER_USER]: (state, action) => ({ user: state.user }),
// });

// export function reducer(state = initialState, action = {}) {
//   switch (action.type) {
//     case "user/LOGIN": {
//       console.log(action);
//       return { ...state, user: action.type };
//     }
//     case "user/REGISTER_USER": {
//       return { ...state, register: action.payload };
//     }
//     default:
//       return state;
//   }
// }

const actionCreators = {
  login,
  registerUser,
};

export { actionCreators };

export const userActions = userSlice.actions;
export default userSlice.reducer;

