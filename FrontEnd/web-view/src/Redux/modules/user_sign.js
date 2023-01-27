import { REGISTER_USER } from "types";

export default function user_sign(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    default:
      return state;
  }
}
