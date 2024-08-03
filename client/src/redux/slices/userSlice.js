import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUserProfile: (state, action) => {
      const { photoURL, displayName, email, emailVerified } = action.payload;
      if (state.user) {
        state.user = {
          ...state.user,
          photoURL: photoURL || state.user.photoURL,
          displayName: displayName || state.user.displayName,
          email: email || state.user.email,
          emailVerified: emailVerified || state.user.emailVerified,
        };
      }
    },
    verifyUserProfile: (state) => {
      if (state.user) {
        state.user = {
          ...state.user,
          emailVerified: true,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUserProfile, verifyUserProfile } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
