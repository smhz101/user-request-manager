import { createSlice } from "@reduxjs/toolkit";

const appearanceSettingsSlice = createSlice({
  name: "appearanceSettings",
  initialState: {
    themeColor: "",
    fontFamily: "",
    fontSize: "",
    customCSS: "",
    tableRowHighlightColor: "",
    buttonHoverColor: "",
    modalBackgroundColor: "",
  },
  reducers: {
    setAppearanceSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAppearanceSettings } = appearanceSettingsSlice.actions;

export default appearanceSettingsSlice.reducer;
