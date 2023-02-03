import { createStore, combineReducers } from 'redux';
import mirror from './modules/mirror';

// rootReducer 생성
const rootReducer = combineReducers( { 
    // reducer가 여러 개 되면 여기다가 추가
    mirror:mirror, 
} );

// store 생성
const store = createStore(rootReducer);

export default store;