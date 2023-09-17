import { createSlice } from "@reduxjs/toolkit";

const notificationSettingsSlice = createSlice({
  name: "notificationSettings",
  initialState: {
    enableNotifications: false,
    notificationRecipients: "",
    notificationSubject: "",
    notificationMessage: "",
    notificationFrequency: "Instantly",
    includeResolved: false,
  },
  reducers: {
    setNotificationSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setNotificationSettings } = notificationSettingsSlice.actions;

export default notificationSettingsSlice.reducer;
