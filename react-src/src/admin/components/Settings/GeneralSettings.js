import React from "react";
import { Input, Switch, Select, Textarea } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setGeneralSettings } from "../../../store/reducers/settings/generalSettingsSlice";
import { ConditionalBox, Condition, True } from "../../common";
import { __ } from "@wordpress/i18n"; // Internationalization function

/**
 * GeneralSettings Component
 * This component allows users to adjust their general settings.
 *
 * @returns {React.Component}
 */
function GeneralSettings() {
  const generalSettings = useSelector((state) => state.generalSettings);
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
    dispatch(setGeneralSettings({ ...generalSettings, [name]: value }));
  };

  const statusOptions = [
    { value: "unread", label: __("Unread", "user-request-manager") },
    { value: "in-progress", label: __("In Progress", "user-request-manager") },
    { value: "resolved", label: __("Resolved", "user-request-manager") },
  ];

  return (
    <>
      <div className="setting-row">
        <ConditionalBox>
          <Condition value="on">
            <div className="setting-row">
              <label htmlFor="test">
                {__("Testing:", "user-request-manager")}
              </label>
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
              <label htmlFor="test1">
                {__("Enable Auto-Reply:", "user-request-manager")}
              </label>
              <Switch
                id="test1"
                name="test1"
                checked={generalSettings.test1}
                onChange={handleInputChange}
              />
            </div>
            <div className="setting-row">
              <label htmlFor="test2">
                {__("Enable Auto-Reply:", "user-request-manager")}
              </label>
              <Switch
                id="test2"
                name="test2"
                checked={generalSettings.test2}
                onChange={handleInputChange}
              />
            </div>
          </True>
        </ConditionalBox>
      </div>

      <div className="setting-row">
        <label htmlFor="activateRequests">
          {__("Activate User Requests:", "user-request-manager")}
        </label>
        <Switch
          id="activateRequests"
          name="activateRequests"
          checked={generalSettings.activateRequests}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="defaultStatus">
          {__("Default Status for New Requests:", "user-request-manager")}
        </label>
        <Select
          id="defaultStatus"
          name="defaultStatus"
          value={generalSettings.defaultStatus || ""}
          options={statusOptions}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="autoReply">
          {__("Enable Auto-Reply:", "user-request-manager")}
        </label>
        <Switch
          id="autoReply"
          name="autoReply"
          checked={generalSettings.autoReply}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="autoReplyMessage">
          {__("Auto-Reply Message:", "user-request-manager")}
        </label>
        <Textarea
          id="autoReplyMessage"
          name="autoReplyMessage"
          value={generalSettings.autoReplyMessage || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="notificationEmail">
          {__("Notification Email:", "user-request-manager")}
        </label>
        <Input
          id="notificationEmail"
          type="email"
          name="notificationEmail"
          value={generalSettings.notificationEmail || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="requestLimit">
          {__("Request Limit per Day:", "user-request-manager")}
        </label>
        <Input
          id="requestLimit"
          type="number"
          name="requestLimit"
          value={generalSettings.requestLimit || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label htmlFor="enableCaptcha">
          {__("Enable Captcha Verification:", "user-request-manager")}
        </label>
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
