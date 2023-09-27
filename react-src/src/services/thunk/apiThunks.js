import { fetchSettings, saveSettings, updateRequestStatus } from "../api";
import { __ } from "@wordpress/i18n";

import { setGeneralSettings } from "../../store/reducers/settings/generalSettingsSlice";
import { setNotificationSettings } from "../../store/reducers/settings/notificationSettingsSlice";
import { setAppearanceSettings } from "../../store/reducers/settings/appearanceSettingsSlice";
import { setAdvancedSettings } from "../../store/reducers/settings/advancedSettingsSlice";

import {
  requestStatusUpdated,
  requestStatusUpdateFailed,
} from "../../store/reducers/requests/requestsSlice";

/**
 * Thunk action to fetch settings from the server and dispatch them to the store.
 *
 * @returns {Function} Thunk action.
 */
export const fetchSettingsThunk = () => async (dispatch) => {
  try {
    const response = await fetchSettings();

    dispatch(setGeneralSettings(response.general));
    dispatch(setNotificationSettings(response.notifications));
    dispatch(setAppearanceSettings(response.appearance));
    dispatch(setAdvancedSettings(response.advanced));

    return Promise.resolve(); // Return a resolved promise
  } catch (error) {
    console.error(
      __("Failed to fetch settings:", "user-request-manager"),
      error
    );
    return Promise.reject(error); // Return a rejected promise
  }
};

/**
 * Thunk action to save settings to the server.
 *
 * @param {Object} settings - The settings object to save.
 * @returns {Function} Thunk action.
 */
export const saveSettingsThunk = (settings) => async (dispatch) => {
  try {
    await saveSettings(settings);
    console.log(__("Settings saved successfully!", "user-request-manager"));

    // Re-fetch the settings after saving
    dispatch(fetchSettingsThunk());
  } catch (err) {
    console.log(
      __("Error saving settings: ", "user-request-manager") + err.message
    );
  }
};

/**
 * Thunk action to update the status of a user request.
 *
 * @param {number|string} id - The ID of the request to be updated.
 * @param {string} status - The new status to be assigned to the request.
 * @returns {Function} Thunk action.
 */
export const updateRequestStatusThunk = (id, status) => async (dispatch) => {
  try {
    await updateRequestStatus(id, status);

    // Dispatch a success action to update the Redux state.
    dispatch(requestStatusUpdated({ id, status }));

    console.log(
      __("Request status updated successfully!", "user-request-manager")
    );
  } catch (err) {
    // Dispatch an error action to update the Redux state.
    dispatch(requestStatusUpdateFailed({ id, error: err.message }));

    console.log(
      __("Error updating request status: ", "user-request-manager") +
        err.message
    );
  }
};

// @TODO: Consider handling the error in a more user-friendly way, perhaps by dispatching an action to the store to display an error message to the user.
