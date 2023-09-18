import React from "react";
import { Input, Switch, Select, Button } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setAdvancedSettings } from "../../../store/reducers/settings/advancedSettingsSlice";
import { __ } from "@wordpress/i18n"; // Internationalization function

/**
 * AdvancedSettings Component
 * This component allows users to adjust their advanced settings.
 *
 * @returns {React.Component}
 */
function AdvancedSettings() {
  const advancedSettings = useSelector((state) => state.advancedSettings);
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
    dispatch(setAdvancedSettings({ ...advancedSettings, [name]: value }));
  };

  return (
    <>
      <div className="setting-row">
        <label>{__("API Key:", "user-request-manager")}</label>
        <Input
          type="text"
          name="apiKey"
          placeholder={__("Enter your API key", "user-request-manager")}
          value={advancedSettings.apiKey || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Debug Mode:", "user-request-manager")}</label>
        <Switch
          name="debugMode"
          checked={advancedSettings.debugMode}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Custom Endpoint:", "user-request-manager")}</label>
        <Input
          type="text"
          name="customEndpoint"
          placeholder="https://example.com/api/"
          value={advancedSettings.customEndpoint || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Data Retention Period:", "user-request-manager")}</label>
        <Select
          name="dataRetention"
          options={[
            __("1 month", "user-request-manager"),
            __("3 months", "user-request-manager"),
            __("6 months", "user-request-manager"),
            __("1 year", "user-request-manager"),
            __("Indefinitely", "user-request-manager"),
          ]}
          value={advancedSettings.dataRetention || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <Button type="button">
          {__("Database Cleanup", "user-request-manager")}
        </Button>
        <small>
          {__(
            "This will remove old data. Use with caution.",
            "user-request-manager"
          )}
        </small>
      </div>

      <div className="setting-row">
        <Button type="button">
          {__("Export Data", "user-request-manager")}
        </Button>
      </div>

      <div className="setting-row urm-input-group inline">
        <label>{__("Import Data:", "user-request-manager")}</label>
        <Input
          type="file"
          name="importData"
          value={advancedSettings.importData || ""}
          onChange={handleInputChange}
        />

        <Button type="button">{__("Import", "user-request-manager")}</Button>
      </div>
    </>
  );
}

export default AdvancedSettings;
