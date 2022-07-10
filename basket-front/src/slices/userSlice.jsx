import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infos: {},
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.infos = action.payload; // update the state with the action commin in named "payload"
      state.isLogged = true;
    },
    setLogout: (state) => {
      state.infos = {};
      state.isLogged = false;
    },
  },
});

export const { setUser } = userSlice.actions;
export const { setLogout } = userSlice.actions;

// selectors
export const selectUser = (state) => state.user;


export default userSlice.reducer;
