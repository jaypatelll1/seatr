import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    role: null,
    id: null,
    name: null,
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;

    },
    clearUser: (state) => {
      state.token = null;
      state.role = null;
      state.id = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
