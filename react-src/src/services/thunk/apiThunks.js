import { fetchSettings, saveSettings } from "../api";

import { setGeneralSettings } from "../../store/reducers/settings/generalSettingsSlice";
import { setNotificationSettings } from "../../store/reducers/settings/notificationSettingsSlice";
import { setAppearanceSettings } from "../../store/reducers/settings/appearanceSettingsSlice";
import { setAdvancedSettings } from "../../store/reducers/settings/advancedSettingsSlice";

export const fetchSettingsThunk = () => async (dispatch) => {
  try {
    const response = await fetchSettings();

    dispatch(setGeneralSettings(response.general));
    dispatch(setNotificationSettings(response.notifications));
    dispatch(setAppearanceSettings(response.appearance));
    dispatch(setAdvancedSettings(response.advanced));

    return Promise.resolve(); // Return a resolved promise
  } catch (error) {
    // Handle the error, maybe dispatch another action to set an error state
    console.error("Failed to fetch settings:", error);
    return Promise.reject(error); // Return a rejected promise
  }
};

export const saveSettingsThunk = (settings) => async (dispatch) => {
  try {
    await saveSettings(settings);
    console.log("Settings saved successfully!");

    // Re-fetch the settings after saving
    dispatch(fetchSettingsThunk());
  } catch (err) {
    console.log("Error saving settings: " + err.message);
  }
};

// ... other thunks
