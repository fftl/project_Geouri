import { combineReducers } from "redux";

import userSlice from "./user";

export default combineReducers({
  user: userSlice.reducer,
});
