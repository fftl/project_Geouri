import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//Action TYPE
const LOGIN = "user/LOGIN";

//InitialState
const initialState = {
    user : null,
    is_login : false,
    status: 'idle',
}

//middleware - 비동기 작업 
export const asyncLogin = createAsyncThunk(
    // type
    'userSlice/asyncLogin',
    // function
    async ( userInfo ) => {

        const email = userInfo.email;
        const password = userInfo.password; 

        // 여기에서 api 통신
        const response = await axios.get('/dfsfsd', email, password);
            // const response = await userAPI.loginDB(email.password);  

        // login하면 user 정보랑 token 줌 
        const user = response.data.user;
        const jwt = user.token;
        sessionStorage.setItem('jwt', jwt);
        //sessionStorage와 localStorage의 차이점
        return user;
    }
)


//reducer 
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isLogin: (state) => {
            if (localStorage.getItem('token')){
                state.is_login = true;
            } else {
                state.is_login = false;
            }
        },
    },
    // 비동기 작업의 reducers
    extraReducers: (builder) => {
        builder.addCase(asyncLogin.pending, (state, action) => { 
            if (state.status === 'idle'){
                state.status = 'pending'; 
            }
        })
        builder.addCase(asyncLogin.fulfilled, (state, action) => { 
            if (state.status === 'pending' && state.is_login === false) {
                state.status = 'idle'; 
                state.is_login = true;
                state.user = action.payload.user;
            }
        })
        builder.addCase(asyncLogin.rejected, (state, action) => { 
            state.status = 'rejected'; 
            console.log(action.payload);
        })
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;