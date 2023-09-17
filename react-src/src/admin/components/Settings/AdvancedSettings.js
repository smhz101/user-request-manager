import React from "react";
import { Input, Switch, Select, Button } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setAdvancedSettings } from "../../../store/reducers/settings/advancedSettingsSlice";

function AdvancedSettings() {
  const advancedSettings = useSelector((state) => state.advancedSettings);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;
    console.log("value ", value);
    dispatch(setAdvancedSettings({ ...advancedSettings, [name]: value }));
  };

  return (
    <>
      <div className="setting-row">
        <label>API Key:</label>
        <Input
          type="text"
          name="apiKey"
          placeholder="Enter your API key"
          value={advancedSettings.apiKey || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Debug Mode:</label>
        <Switch
          name="debugMode"
          checked={advancedSettings.debugMode}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Custom Endpoint:</label>
        <Input
          type="text"
          name="customEndpoint"
          placeholder="https://example.com/api/"
          value={advancedSettings.customEndpoint || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Data Retention Period:</label>
        <Select
          name="dataRetention"
          options={[
            "1 month",
            "3 months",
            "6 months",
            "1 year",
            "Indefinitely",
          ]}
          value={advancedSettings.dataRetention || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <Button type="button">Database Cleanup</Button>
        <small>This will remove old data. Use with caution.</small>
      </div>

      <div className="setting-row">
        <Button type="button">Export Data</Button>
      </div>

      <div className="setting-row urm-input-group inline">
        <label>Import Data:</label>
        <Input
          type="file"
          name="importData"
          value={advancedSettings.importData || ""}
          onChange={handleInputChange}
        />

        <Button type="button">Import</Button>
      </div>
    </>
  );
}

export default AdvancedSettings;
