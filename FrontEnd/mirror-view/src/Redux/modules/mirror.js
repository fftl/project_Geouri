import { createAction, createSlice } from '@reduxjs/toolkit';

const mirrorSlice = createSlice({
    name: 'mirror',
    initialState: {
        member: {},
        message : '',
        action: '',
        
    },
    reducers: {
        getMember(state, action) {
            console.log(action.payload);    
            state.member = action.payload;
        },

        getAction(state, action) {
            console.log(action.payload);
            state.action = action.payload.cmd;
            state.message = action.payload.content;
        },

        finish(state) {
            state.message = '';
            state.action = '';
        },

        leaveMirror(state) {
            state.member = {};
            state.message = '';
            state.action = '';
        }
    }
})

export const mirrorActions = mirrorSlice.actions;
export default mirrorSlice.reducer;
