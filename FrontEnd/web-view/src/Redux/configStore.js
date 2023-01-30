import { configureStore } from '@reduxjs/toolkit';
import user from './modules/user';

<<<<<<< HEAD
const store = configureStore({
    reducer: {
        user: user,
        
    },
})
=======
const rootReducer = combineReducers({ user:user });

const store = createStore(rootReducer);
>>>>>>> feature/fe-signup

export default store;