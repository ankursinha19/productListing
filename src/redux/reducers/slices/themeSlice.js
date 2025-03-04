import { createSlice } from '@reduxjs/toolkit';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
    theme: DefaultTheme, // Start with light theme
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      state.theme = state.darkMode ? DarkTheme : DefaultTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
