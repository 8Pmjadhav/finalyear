import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import serverStatus from './serverStatus';
const store = configureStore({
    reducer:{
        auth:authSlice,
        serverStatus:serverStatus
    }
});

export default store;