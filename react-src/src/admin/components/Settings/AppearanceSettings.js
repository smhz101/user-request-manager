import React, { useEffect, useState } from "react";
import { Input, Select, Select2, Textarea } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { setAppearanceSettings } from "../../../store/reducers/settings/appearanceSettingsSlice";
import { __ } from "@wordpress/i18n"; // Internationalization function
import axios from "axios";

/**
 * @TODO: Enhance the user experience by providing feedback (like a toast notification) after settings are saved.
 * @TODO: Consider providing a reset button to revert to default appearance settings.
 * @TODO: Error handling and feedback might be required if the dispatched action encounters an error.
 */

/**
 * AppearanceSettings Component
 * This component allows users to adjust their appearance settings.
 *
 * @returns {React.Component}
 */
function AppearanceSettings() {
  const appearanceSettings = useSelector((state) => state.appearanceSettings);
  const dispatch = useDispatch();

  const [googleFonts, setGoogleFonts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAusi0Mj0HcqgfAYFe7TTyqdHFq3EcJe2A"
      )
      .then((response) => {
        const fontOptions = response.data.items.map((font) => ({
          value: font.family,
          label: font.family,
        }));
        setGoogleFonts(fontOptions);
      })
      .catch((error) => {
        console.error("Error fetching Google Fonts:", error);
      });
  }, []);

  const handleFontChange = (selectedOption) => {
    // Dispatch the new fontFamily to your Redux store
    dispatch(
      setAppearanceSettings({
        ...appearanceSettings,
        fontFamily: selectedOption.value,
      })
    );
  };

  console.log("Fonts list: ", googleFonts);

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

  const fontSizeOptions = [
    { value: "14px", label: __("Default", "user-request-manager") },
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
  ];

  // Add this to your options array
  const modalAnimationOptions = [
    { value: "fade-in", label: __("Fade In", "user-request-manager") },
    {
      value: "slide-in-right",
      label: __("Slide In from Right", "user-request-manager"),
    },
    {
      value: "slide-in-left",
      label: __("Slide In from Left", "user-request-manager"),
    },
    {
      value: "slide-in-top",
      label: __("Slide In from Top", "user-request-manager"),
    },
    {
      value: "slide-in-bottom",
      label: __("Slide In from Bottom", "user-request-manager"),
    },
    { value: "zoom-in", label: __("Zoom In", "user-request-manager") },
    { value: "rotate-in", label: __("Rotate In", "user-request-manager") },
    { value: "bounce-in", label: __("Bounce In", "user-request-manager") },
    { value: "flip-in", label: __("Flip In", "user-request-manager") },
    { value: "roll-in", label: __("Roll In", "user-request-manager") },
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
        {googleFonts.length > 0 && (
          <Select2
            name="fontFamily"
            options={googleFonts}
            value={googleFonts.find(
              (option) => option.value === appearanceSettings.fontFamily
            )}
            onChange={handleFontChange}
            isSearchable={true}
            isMulti={false}
          />
        )}
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

      <div className="setting-row">
        <label>{__("Modal Animation Style:", "user-request-manager")}</label>
        <Select
          name="modalAnimationStyle"
          options={modalAnimationOptions}
          value={appearanceSettings.modalAnimationStyle || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="setting-row">
        <label>
          {__("Modal Animation Duration (ms):", "user-request-manager")}
        </label>
        <Input
          type="number"
          name="modalAnimationDuration"
          value={appearanceSettings.modalAnimationDuration || ""}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default AppearanceSettings;
