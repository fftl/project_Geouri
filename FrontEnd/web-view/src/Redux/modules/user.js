import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 중복된 주소를 줄이는 방법
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true; // front, back 간 쿠키 공유

//Action TYPE
export const REGISTER_USER = "user/REGISTER_USER";

// Action creator
const registerUser = createAction(REGISTER_USER);

//InitialState
const initialState = {
  memberList: {},
  member: {},
  is_login: false,
  status: "idle",
  signupDone: false,
  isJoining: false,
  signupError: "",
  loading: false,
  error: null
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

    // 여기에서 login api 통신
    const response = await api.post("/web/login", {
      email: email, 
      password: password
    });
    if(!response){
      throw new Error('err');
    }
    return response.data.data;
    
  }
);

// 
export const asyncGetMember = createAsyncThunk(
  // type
  "userSlice/asyncGetMember",
  // function
  async (memberKey) => {
    const response = await api.get('/web/member', {
      headers:{
        'member-key':memberKey,
      },
    });
    if(!response){
      throw new Error('error');
    }
    if(response.success === false){
      throw new Error('error');
    }
    return response.data.data;
  }
);

export const asyncRegisterMirror = createAsyncThunk(
  // type
  "userSlice/asyncRegisterMirror",
  // function
  async (userKey, serialNumber) => {
    const navigate = useNavigate();
    
    await api.post("/addMirror", {
      headers: {
        "user-key": userKey,
      },
      'serial-num': serialNumber
    })
    .then((response) => {
      console.log(response?.data?.data);
      window.alert('')
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    })

  }
)

//reducer
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    isLogin: (state) => {
      if (localStorage.getItem("jwt")) {
        state.is_login = true;
      } else {
        state.is_login = false;
      }
    },
    setMemberList: (state, action) => {
      state.memberList = action.payload;
    }
  },
  // 비동기 작업의 reducers
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
        state.userKey = action.payload.userKey;
        console.log( action.payload)
        localStorage.setItem('userKey', action.payload.userKey);
        localStorage.setItem('serialNumber', action.payload.serialNumber);
      }
    );
    
    
    // asyncGetMember
    builder.addCase(asyncGetMember.pending, (state) => {
      state.member = {};
      console.log('pending');
    });
    builder.addCase(asyncGetMember.fulfilled, (state, action) => {
      state.member = action.payload;
    });
    builder.addCase(asyncGetMember.rejected, (state) => {
      console.log('rejected');
    });

    //signup
    builder.addCase(signup.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(signup.fulfilled, (state, action) => {
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
  registerUser,
  
};

export { actionCreators };

export const userActions = userSlice.actions;
export default userSlice.reducer;

