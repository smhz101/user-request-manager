import React from "react";
import { Input, Switch, Select, Textarea, Button } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationSettings } from "../../../store/reducers/settings/notificationSettingsSlice";

function NotificationSettings() {
  const notificationsSettings = useSelector(
    (state) => state.notificationSettings
  );
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;
    console.log("value ", value);
    dispatch(
      setNotificationSettings({ ...notificationsSettings, [name]: value })
    );
  };

  const notificationFrequencyOptions = [
    { value: "instantly", label: "Instantly" },
    { value: "daily-digest", label: "Daily Digest" },
    { value: "weekly-digest", label: "Weekly Digest" },
  ];

  return (
    <>
      <div className="setting-row">
        <label>Enable Notifications:</label>
        <Switch
          name="enableNotifications"
          checked={notificationsSettings.enableNotifications}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Notification Recipients (comma-separated):</label>
        <Input
          type="text"
          name="notificationRecipients"
          value={notificationsSettings.notificationRecipients || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Notification Subject:</label>
        <Input
          type="text"
          name="notificationSubject"
          value={notificationsSettings.notificationSubject || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Notification Message:</label>
        <Textarea
          name="notificationMessage"
          value={notificationsSettings.notificationMessage || ""}
          onChange={handleInputChange}
        />
        <small>
          You can use placeholders like {`{username}`} and {`{request_date}`}
        </small>
      </div>

      <div className="setting-row">
        <Button type="button">Send Test Notification</Button>
      </div>

      <div className="setting-row">
        <label>Notification Frequency:</label>
        <Select
          name="notificationFrequency"
          value={notificationsSettings.notificationFrequency || ""}
          options={notificationFrequencyOptions}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Include Resolved Requests in Digest:</label>
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
