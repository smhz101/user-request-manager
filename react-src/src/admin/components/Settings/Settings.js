import React, { useEffect, useState } from "react";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="settings wrap">
      <header>
        <h1 className="wp-heading-inline">Settings</h1>
      </header>

      <main>
        <Form onSubmit={handleSubmit}>
          <div className="urm-settings">
            <Tabs>
              <Tab label="General">
                <GeneralSettings />
              </Tab>
              <Tab label="Notifications">
                <NotificationSettings />
              </Tab>
              <Tab label="Appearance">
                <AppearanceSettings />
              </Tab>
              <Tab label="Advanced">
                <AdvancedSettings />
              </Tab>
            </Tabs>
            <Button type="submit">Save All Changes</Button>
          </div>
        </Form>
      </main>
    </div>
  );
}

export default Settings;
