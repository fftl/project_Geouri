import { createAction, createSlice } from '@reduxjs/toolkit';

const mirrorSlice = createSlice({
    name: 'mirror',
    initialState: {
        member: {
            "data": {
                "memberKey": 1,
                "nickname": "쏘영이",
                "birth": "1998-09-11",
                "kidsMode": true,
                "widget": {
                    "news": true,
                    "playlist": true,
                    "shot": false,
                    "calender": true
                },
                "playlist":     "https://youtube.com/playlist?list=PLRDEZ1-f6MAemydrZr4qK9JN3fXKCplNy",
                "calender": null,
                "region": {
                    "sidoName": "인천광역시",
                    "gugunName": "부평구",
                    "dongName": "부개동",
                    "lng": 126.7297474239,
                    "lat": 37.4893497823
                }
            }
        },
        message : '',
        action: 1,
        
    },
    reducers: {
        getMember(state, action) {
            state.member = action.payload.content;
        },

        getMessage(state, action) {
            state.message = action.payload.content;
        },

        leaveMirror(state) {
            state.member = {};
        }
    }
})

export const mirrorActions = mirrorSlice.actions;
export default mirrorSlice.reducer;
