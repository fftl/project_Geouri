import { createAction, handleActions } from "redux-actions";

//Action TYPE
const LOGIN = "user/LOGIN";
const SIGNUP = "user/SIGNUP";

// Action creator
const login = createAction(LOGIN);
const signup = createAction(SIGNUP);

//InitialState
const initialState = {
  user: null,
};

const userReducer = handleActions(
  {
    [LOGIN]: (state, action) => ({ user: state.user }),
    [SIGNUP]: (state, action) => ({ user: state.user }),
  },
  initialState
);
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "user/LOGIN": {
      console.log(action);
      return { ...state, user: action.type };
    }
    case "user/SIGNUP": {
      return { ...state, register: action.payload };
    }
    default:
      return state;
  }
}

const actionCreators = {
  login,
  signup,
};

export { actionCreators };
