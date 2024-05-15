// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: false,
  user:''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;  
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
