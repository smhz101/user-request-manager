import { createSlice } from "@reduxjs/toolkit";

const generalSettingsSlice = createSlice({
  name: "generalSettings",
  initialState: {
    activateRequests: "",
    defaultStatus: "",
    autoReply: "",
    autoReplyMessage: "",
    notificationEmail: "",
    requestLimit: "",
    enableCaptcha: "",
  },
  reducers: {
    setGeneralSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setGeneralSettings } = generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;
