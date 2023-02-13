import { createSlice } from '@reduxjs/toolkit';

const mirrorSlice = createSlice({
    name: 'mirror',
    initialState: {
        member: {},
        message : '',
        content : '',
        action: '',
        alertMsg: '',
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

        getAlertMsg(state){
            state.alertMsg = '';
        },

        delMessage(state) {
            state.action = '';
            state.message = '';
        },

        leaveMirror(state) {
            state.member = {};
            state.message = '';
            state.content = '';
            state.action = '';
        }
    }
})

export const mirrorActions = mirrorSlice.actions;
export default mirrorSlice.reducer;
