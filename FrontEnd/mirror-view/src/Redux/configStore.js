import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import mirror from './modules/mirror';

<<<<<<< HEAD
const rootReducer = combineReducers({ mirror: mirror,})
// store 생성
const store = configureStore({ reducer : rootReducer });
=======
// rootReducer 생성
const rootReducer = combineReducers( { 
    // reducer가 여러 개 되면 여기다가 추가
    mirror: mirror, 
} );

// store 생성
const store = configureStore({reducer : rootReducer});
>>>>>>> 5e825ad0bcbdbb7b12d9e47f2915fdb2adfa23b3

export default store;