const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  landingMessage: { status: false, helperData: null },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    addTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    addUser(state, action) {
      state.user = action.payload;
    },
    removeTokens(state, action) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    showMessage(state, action) {
      state.landingMessage.helperData = action.payload;
      state.landingMessage.status = true;
    },
    closeMessage(state) {
      state.landingMessage.status = false;
      state.landingMessage.helperData = null;
    },
  },
});

export const { addTokens, removeTokens, addUser, showMessage, closeMessage } =
  authSlice.actions;
export default authSlice.reducer;
