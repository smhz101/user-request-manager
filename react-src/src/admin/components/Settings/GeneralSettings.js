import React from "react";
import { Input, Switch, Select, Textarea } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setGeneralSettings } from "../../../store/reducers/settings/generalSettingsSlice";

import { ConditionalBox, Condition, True, False } from "../../common";

function GeneralSettings() {
  const generalSettings = useSelector((state) => state.generalSettings);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;
    console.log("value ", value);

    dispatch(setGeneralSettings({ ...generalSettings, [name]: value }));
  };

  // Adjust the options structure
  const statusOptions = [
    { value: "unread", label: "Unread" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  return (
    <>
      <div className="setting-row">
        <ConditionalBox>
          <Condition value="on">
            <div className="setting-row">
              <label htmlFor="test">Testing:</label>
              <Switch
                id="test"
                name="test"
                checked={generalSettings.test}
                onChange={handleInputChange}
              />
            </div>
          </Condition>
          <True>
            <div className="setting-row">
              <label htmlFor="test1">Enable Auto-Reply:</label>
              <Switch
                id="test1"
                name="test1"
                checked={generalSettings.test1}
                onChange={handleInputChange}
              />
            </div>
            <div className="setting-row">
              <label htmlFor="test2">Enable Auto-Reply:</label>
              <Switch
                id="test2"
                name="test2"
                checked={generalSettings.test2}
                onChange={handleInputChange}
              />
            </div>
          </True>
          {/* <False>
            <p>nothing to show</p>
          </False> */}
        </ConditionalBox>
      </div>

      <div className="setting-row">
        <label htmlFor="activateRequests">Activate User Requests:</label>
        <Switch
          id="activateRequests"
          name="activateRequests"
          checked={generalSettings.activateRequests}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="defaultStatus">Default Status for New Requests:</label>
        <Select
          id="defaultStatus"
          name="defaultStatus"
          value={generalSettings.defaultStatus || ""}
          options={statusOptions}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="autoReply">Enable Auto-Reply:</label>
        <Switch
          id="autoReply"
          name="autoReply"
          checked={generalSettings.autoReply}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="autoReplyMessage">Auto-Reply Message:</label>
        <Textarea
          id="autoReplyMessage"
          name="autoReplyMessage"
          value={generalSettings.autoReplyMessage || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="notificationEmail">Notification Email:</label>
        <Input
          id="notificationEmail"
          type="email"
          name="notificationEmail"
          value={generalSettings.notificationEmail || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="requestLimit">Request Limit per Day:</label>
        <Input
          id="requestLimit"
          type="number"
          name="requestLimit"
          value={generalSettings.requestLimit || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="enableCaptcha">Enable Captcha Verification:</label>
        <Switch
          id="enableCaptcha"
          name="enableCaptcha"
          checked={generalSettings.enableCaptcha}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default GeneralSettings;
