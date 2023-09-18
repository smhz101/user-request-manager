import React from "react";
import { Input, Switch, Select, Textarea, Button } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationSettings } from "../../../store/reducers/settings/notificationSettingsSlice";
import { __ } from "@wordpress/i18n";

/**
 * @TODO: Enhance the user experience by providing feedback (like a toast notification) after settings are saved or after performing database cleanups * and imports.
 *
 * @TODO: Consider implementing a confirmation dialog before performing the database cleanup.
 *
 * @TODO: Error handling and feedback might be required if the dispatched action encounters an error, or if the data import/export process has issues.
 *
 * @TODO: The value attribute in the Input element with type "file" (name="importData") does not seem appropriate. Input of type "file" should not
 * have a value property set by default for security reasons.
 *
 * @TODO: Implement the actual logic behind the "Database Cleanup", "Export Data", and "Import Data" buttons. They currently don't perform any actions.
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
    { value: "instantly", label: __("Instantly") },
    { value: "daily-digest", label: __("Daily Digest") },
    { value: "weekly-digest", label: __("Weekly Digest") },
  ];

  return (
    <>
      <div className="setting-row">
        <label>{__("Enable Notifications:")}</label>
        <Switch
          name="enableNotifications"
          checked={notificationsSettings.enableNotifications}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Notification Recipients (comma-separated):")}</label>
        <Input
          type="text"
          name="notificationRecipients"
          value={notificationsSettings.notificationRecipients || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Notification Subject:")}</label>
        <Input
          type="text"
          name="notificationSubject"
          value={notificationsSettings.notificationSubject || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Notification Message:")}</label>
        <Textarea
          name="notificationMessage"
          value={notificationsSettings.notificationMessage || ""}
          onChange={handleInputChange}
        />
        <small>
          {__("You can use placeholders like {username} and {request_date}")}
        </small>
      </div>

      <div className="setting-row">
        <Button type="button">{__("Send Test Notification")}</Button>
      </div>

      <div className="setting-row">
        <label>{__("Notification Frequency:")}</label>
        <Select
          name="notificationFrequency"
          value={notificationsSettings.notificationFrequency || ""}
          options={notificationFrequencyOptions}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Include Resolved Requests in Digest:")}</label>
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
