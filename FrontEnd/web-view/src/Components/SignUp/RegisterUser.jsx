import axios from "axios";
import { REGISTER_USER } from "../../Redux/modules/user";
import { combineReducers } from "redux";
import { userSlice } from "../../Redux/modules/user";
// export function RegisterUser(data) {
//   const request = axios
//     .post("http://localhost:3000/signup", data)
//     .then((response) => response.data);

//   return {
//     type: REGISTER_USER,
//     payload: request,
//   };
// }
