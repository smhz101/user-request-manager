import React from "react";
import { Input, Select, Textarea } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setAppearanceSettings } from "../../../store/reducers/settings/appearanceSettingsSlice";
import { __ } from "@wordpress/i18n"; // Internationalization function

/**
 * AppearanceSettings Component
 * This component allows users to adjust their appearance settings.
 *
 * @returns {React.Component}
 */
function AppearanceSettings() {
  const appearanceSettings = useSelector((state) => state.appearanceSettings);
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
    dispatch(setAppearanceSettings({ ...appearanceSettings, [name]: value }));
  };

  const fontFamilyOptions = [
    { value: "roboto", label: __("Roboto", "user-request-manager") },
    {
      value: "playFair-display",
      label: __("Playfair Display", "user-request-manager"),
    },
  ];

  const fontSizeOptions = [
    { value: "14px", label: __("Default", "user-request-manager") },
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
  ];

  return (
    <>
      <div className="setting-row">
        <label>{__("Theme Color:", "user-request-manager")}</label>
        <Input
          type="color"
          name="themeColor"
          value={appearanceSettings.themeColor || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Font Family:", "user-request-manager")}</label>
        <Select
          name="fontFamily"
          options={fontFamilyOptions}
          value={appearanceSettings.fontFamily || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Font Size:", "user-request-manager")}</label>
        <Select
          name="fontSize"
          options={fontSizeOptions}
          value={appearanceSettings.fontSize || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Custom CSS:", "user-request-manager")}</label>
        <Textarea
          name="customCSS"
          value={appearanceSettings.customCSS || ""}
          onChange={handleInputChange}
        />
        <small>
          {__(
            "Enter custom CSS to further style the plugin. Use with caution.",
            "user-request-manager"
          )}
        </small>
      </div>

      <div className="setting-row">
        <label>
          {__("Table Row Highlight Color:", "user-request-manager")}
        </label>
        <Input
          type="color"
          name="tableRowHighlightColor"
          value={appearanceSettings.tableRowHighlightColor || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Button Hover Color:", "user-request-manager")}</label>
        <Input
          type="color"
          name="buttonHoverColor"
          value={appearanceSettings.buttonHoverColor || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>{__("Modal Background Color:", "user-request-manager")}</label>
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
