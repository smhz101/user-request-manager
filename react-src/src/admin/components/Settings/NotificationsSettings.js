import React from "react";
import { Input, Switch, Select, Textarea, Button } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationSettings } from "../../../store/reducers/settings/notificationSettingsSlice";
import { __ } from "@wordpress/i18n";

/**
 * @TODO: Implement feedback or error handling for the "Send Test Notification" button. Currently, it doesn't seem to provide any feedback to the user
 * after being clicked.
 *
 * @TODO: Consider validating the notificationRecipients input to ensure that the provided emails are in the correct format.
 *
 * @TODO: The "Notification Message" allows placeholders like {username} and {request_date}. Consider providing more documentation or a tooltip
 * explaining the available placeholders and their usage.
 *
 * @TODO: For enhanced security, the API key (if present) or any sensitive information should not be stored directly in Redux state without encryption
 * or obfuscation.
 */

/**
 * NotificationSettings Component
 * This component allows users to configure their notification settings.
 *
 * @returns {React.Component}
 */
function NotificationSettings() {
  const notificationsSettings = useSelector(
    (state) => state.notificationSettings
  );
  const dispatch = useDispatch();

  /**
   * Handle changes in the input fields and dispatch them to the store.
   *
   * @param {Event} event - The input change event
   */
  const handleInputChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;
    dispatch(
      setNotificationSettings({ ...notificationsSettings, [name]: value })
    );
  };

  const notificationFrequencyOptions = [
    { value: "instantly", label: __("Instantly", "user-request-manager") },
    {
      value: "daily-digest",
      label: __("Daily Digest", "user-request-manager"),
    },
    {
      value: "weekly-digest",
      label: __("Weekly Digest", "user-request-manager"),
    },
  ];

  return (
    <>
      <div className="setting-row">
        <label>{__("Enable Notifications:", "user-request-manager")}</label>
        <Switch
          name="enableNotifications"
          checked={notificationsSettings.enableNotifications}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>
          {__(
            "Notification Recipients (comma-separated):",
            "user-request-manager"
          )}
        </label>
        <Input
          type="text"
          name="notificationRecipients"
          value={notificationsSettings.notificationRecipients || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Notification Subject:", "user-request-manager")}</label>
        <Input
          type="text"
          name="notificationSubject"
          value={notificationsSettings.notificationSubject || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Notification Message:", "user-request-manager")}</label>
        <Textarea
          name="notificationMessage"
          value={notificationsSettings.notificationMessage || ""}
          onChange={handleInputChange}
        />
        <small>
          {__(
            "You can use placeholders like {username} and {request_date}",
            "user-request-manager"
          )}
        </small>
      </div>

      <div className="setting-row">
        <Button type="button">
          {__("Send Test Notification", "user-request-manager")}
        </Button>
      </div>

      <div className="setting-row">
        <label>{__("Notification Frequency:", "user-request-manager")}</label>
        <Select
          name="notificationFrequency"
          value={notificationsSettings.notificationFrequency || ""}
          options={notificationFrequencyOptions}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>
          {__("Include Resolved Requests in Digest:", "user-request-manager")}
        </label>
        <Switch
          name="includeResolved"
          checked={notificationsSettings.includeResolved}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default NotificationSettings;
