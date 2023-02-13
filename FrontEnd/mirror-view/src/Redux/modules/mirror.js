import { createSlice } from '@reduxjs/toolkit';

const mirrorSlice = createSlice({
    name: 'mirror',
    initialState: {
        member: {
            "memberKey": "nh3b-494F",
            "nickname": "쏘영이",
            "birth": "1998-09-11",
            "kidsMode": true,
            "widget": {
                "news": true,
                "playlist": true,
                "shot": false,
                "calender": true
            },
            "playlist": "https://youtube.com/playlist?list=PLRDEZ1-f6MAemydrZr4qK9JN3fXKCplNy",
            "calender": [{            "title": "테스트1",
                         "start": "2023-02-12",
                         "end": "2023-02-13",
                        "location": null,
                        "allDay": true
            },
            {            "title": "ㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅ",            
                          "start": "2023-02-12 17:00",            
                          "end": "2023-02-12 18:00",            
                          "location": null,            
                          "allDay": false
            },       
            {            "title": "저녁모먹지",
                        "start": "2023-02-12 18:00",
                        "end": "2023-02-12 22:00",
                        "location": null,
                        "allDay": false
            }],
            "region": {
                "sidoName": "인천광역시",
                "gugunName": "부평구",
                "dongName": "부개동",
                "lng": 37.4893497823,
                "lat": 126.7297474239
            },
            "news": [
                {
                    "press": "YTN",
                    "title": "1111얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },
                {
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },
                {
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },
                {
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },{
                    "press": "YTN",
                    "title": "얼굴 공개한 조민 \"떳떳...檢, 우리 가족에 가혹\""
                },
                {
                    "press": "YTN",
                    "title": "중국 정찰풍선 \"한반도 위로 지나갔을 것\"...美 기상전문가 분석"
                },
            ]
  
        },
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
