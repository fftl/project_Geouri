
//Action TYPE
const LOGIN = "user/LOGIN";

//InitialState
const initialState = {
    user : null,
}

// Action creator
export const login = (userInfo) => {
    return { type : LOGIN, userInfo }
}

export default function reducer(state = initialState, action = {}){
    switch (action.type) {
        case "user/LOGIN": {
            console.log(action);
            return {...state, user:action.type}
        }
        default :
            return state;
    }
}

