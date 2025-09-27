import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      ((state.user = action.payload.user),
        (state.token = action.payload.token),
        (state.isAuthenticated = true));
    },
    signout: (state, action) => {
      ((state.user = null),
        (state.token = null),
        (state.isAuthenticated = false));
    },
    setUser: (state, action) => {
      ((state.user = action.payload));
    },
  },
});

export const { signin, signout, setUser } = authSlice.actions;
export default authSlice.reducer;
