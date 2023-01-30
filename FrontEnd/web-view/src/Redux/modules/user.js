import { createAction, handleActions } from "redux-actions";

//Action TYPE
const LOGIN = "user/LOGIN";
const REGISTER_USER = "user/REGISTER_USER";

// Action creator
const login = createAction(LOGIN);
const registerUser = createAction(REGISTER_USER);

//InitialState
const initialState = {
  user: null,
};

const userReducer = handleActions({
  [LOGIN]: (state, action) => ({ user: state.user }),
  [REGISTER_USER]: (state, action) => ({ user: state.user }),
});
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "user/LOGIN": {
      console.log(action);
      return { ...state, user: action.type };
    }
    case "user/REGISTER_USER": {
      return { ...state, register: action.payload };
    }
    default:
      return state;
  }
}

const actionCreators = {
  login,
  registerUser,
};

export { actionCreators };
