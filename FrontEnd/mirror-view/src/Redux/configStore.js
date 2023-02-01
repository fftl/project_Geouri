import { configureStore } from '@reduxjs/toolkit';
import mirror from './modules/mirror';

const store = configureStore({
    reducer: {
        mirror: mirror,
        
    },
})

export default store;