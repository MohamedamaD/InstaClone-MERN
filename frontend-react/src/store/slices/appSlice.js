import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};
const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
    },
    initializeTheme: (state) => {
      state.theme = localStorage.getItem("theme") || "light";
    },
    ToggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { setTheme, initializeTheme, ToggleTheme } = appSlice.actions;

export default appSlice.reducer;
