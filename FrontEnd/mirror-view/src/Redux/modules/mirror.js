import axios from 'axios';
import { handleAction } from 'redux-actions';

// action
const GET_MEMBER = "GET_MEMBER";
const GET_MESSAGE = "GET_MESSAGE";

// action creators
const get_member = createAction(GET_MEMBER);
const get_message = createAction(GET_MESSAGE);

const initialState = {
    response : {
        "success": true,
        "msg": "성공",
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
}

