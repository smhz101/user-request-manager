import React from "react";
import { Input, Select, Textarea } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setAppearanceSettings } from "../../../store/reducers/settings/appearanceSettingsSlice";

function AppearanceSettings() {
  const appearanceSettings = useSelector((state) => state.appearanceSettings);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;
    console.log("value ", value);
    dispatch(setAppearanceSettings({ ...appearanceSettings, [name]: value }));
  };

  const fontFamilyOptions = [
    { value: "roboto", label: "Roboto" },
    { value: "playFair-display", label: "Playfair Display" },
  ];

  const fontSizeOptions = [
    { value: "14px", label: "Default" },
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
  ];

  return (
    <>
      <div className="setting-row">
        <label>Theme Color:</label>
        <Input
          type="color"
          name="themeColor"
          value={appearanceSettings.themeColor || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Font Family:</label>
        <Select
          name="fontFamily"
          options={fontFamilyOptions}
          value={appearanceSettings.fontFamily || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Font Size:</label>
        <Select
          name="fontSize"
          options={fontSizeOptions}
          value={appearanceSettings.fontSize || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Custom CSS:</label>
        <Textarea
          name="customCSS"
          value={appearanceSettings.customCSS || ""}
          onChange={handleInputChange}
        />
        <small>
          Enter custom CSS to further style the plugin. Use with caution.
        </small>
      </div>

      <div className="setting-row">
        <label>Table Row Highlight Color:</label>
        <Input
          type="color"
          name="tableRowHighlightColor"
          value={appearanceSettings.tableRowHighlightColor || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Button Hover Color:</label>
        <Input
          type="color"
          name="buttonHoverColor"
          value={appearanceSettings.buttonHoverColor || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>Modal Background Color:</label>
        <Input
          type="color"
          name="modalBackgroundColor"
          value={appearanceSettings.modalBackgroundColor || ""}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default AppearanceSettings;
