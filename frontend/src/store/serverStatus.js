// serverStatus.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDown: true,
};

export const serverStatus = createSlice({
  name: 'serverStatus',
  initialState,
  reducers: {
    serverUp: (state, action) => {
      state.isDown = true;
    },
    serverDown: (state) => {
      state.isDown = false;
    },
  },
});

export const { serverUp, serverDown } = serverStatus.actions;


export default serverStatus.reducer;
