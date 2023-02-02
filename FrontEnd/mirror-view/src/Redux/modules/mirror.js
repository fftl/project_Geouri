import axios from 'axios';
import { handleAction } from 'redux-actions';

// action
const GET_MEMBER = "GET_MEMBER";
const GET_MESSAGE = "GET_MESSAGE";

// action creators
const get_member = createAction(GET_MEMBER);
const get_message = createAction(GET_MESSAGE);

const initialState = {
    member : null, 
}

export const asyncSocket = createAsyncThunk(

)
// 서버로 메시지 보내기 
// webSocket.send(JSON)

const memberSlice = createSlice({
    name: 'member',
    initialState, 
    reducers: {
        getMember : (state, action) => {
            state.member = [...state, action.payload.member]
        }
    },
    extraReducers : (builder) => {

    }
})
const actionCreators = {
    get_member,
}

export {actionCreators};

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;