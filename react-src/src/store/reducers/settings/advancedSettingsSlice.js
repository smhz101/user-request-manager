import { createSlice } from "@reduxjs/toolkit";

const advancedSettingsSlice = createSlice({
  name: "advancedSettings",
  initialState: {
    apiKey: "",
    debugMode: "",
    customEndpoint: "",
    dataRetention: "",
    importData: "",
  },
  reducers: {
    setAdvancedSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAdvancedSettings } = advancedSettingsSlice.actions;

export default advancedSettingsSlice.reducer;
