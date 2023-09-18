import React, { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import { Tabs, Tab, Button, Form } from "../../common";

import {
  fetchSettingsThunk,
  saveSettingsThunk,
} from "../../../services/thunk/apiThunks";

import GeneralSettings from "./GeneralSettings";
import NotificationSettings from "./NotificationsSettings";
import AppearanceSettings from "./AppearanceSettings";
import AdvancedSettings from "./AdvancedSettings";
import { useSelector, useDispatch } from "react-redux";

import "./Settings.css";

/**
 * Settings component for managing various user settings.
 */
function Settings() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generalSettings = useSelector((state) => state.generalSettings);
  const notificationSettings = useSelector(
    (state) => state.notificationSettings
  );
  const appearanceSettings = useSelector((state) => state.appearanceSettings);
  const advancedSettings = useSelector((state) => state.advancedSettings);

  useEffect(() => {
    dispatch(fetchSettingsThunk())
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allSettings = {
      general: generalSettings,
      notifications: notificationSettings,
      appearance: appearanceSettings,
      advanced: advancedSettings,
    };
    dispatch(saveSettingsThunk(allSettings));
  };

  if (loading) return <p>{__("Loading...", "user-request-manager")}</p>;
  if (error)
    return (
      <p>
        {__("Error:", "user-request-manager")} {error}
      </p>
    );

  return (
    <div className="settings wrap">
      <header>
        <h1 className="wp-heading-inline">
          {__("Settings", "user-request-manager")}
        </h1>
      </header>

      <main>
        <Form onSubmit={handleSubmit}>
          <div className="urm-settings">
            <Tabs>
              <Tab label={__("General", "user-request-manager")}>
                <GeneralSettings />
              </Tab>
              <Tab label={__("Notifications", "user-request-manager")}>
                <NotificationSettings />
              </Tab>
              <Tab label={__("Appearance", "user-request-manager")}>
                <AppearanceSettings />
              </Tab>
              <Tab label={__("Advanced", "user-request-manager")}>
                <AdvancedSettings />
              </Tab>
            </Tabs>
            <Button type="submit">
              {__("Save All Changes", "user-request-manager")}
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
}

export default Settings;
