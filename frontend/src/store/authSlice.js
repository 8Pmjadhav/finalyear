// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: false,
  username: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.username = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.username = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectUsername = (state) => state.auth.username;

export default authSlice.reducer;
