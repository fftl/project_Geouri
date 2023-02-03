import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import mirror from './modules/mirror';

const rootReducer = combineReducers({ mirror: mirror,})
// store 생성
const store = configureStore({ reducer : rootReducer });

export default store;