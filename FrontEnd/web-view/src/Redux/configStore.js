import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'react-redux';
import user from './modules/user';

const store = configureStore({
    reducer: {
        user: user,
        
    },
})
const rootReducer = combineReducers({ user:user });

// const store = createStore(rootReducer);

export default store;