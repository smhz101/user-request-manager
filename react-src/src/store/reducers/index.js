import { combineReducers } from "redux";
import generalSettingsReducer from "./settings/generalSettingsSlice";
import notificationSettingsReducer from "./settings/notificationSettingsSlice";
import appearanceSettingsReducer from "./settings/appearanceSettingsSlice";
import advancedSettingsReducer from "./settings/advancedSettingsSlice";

const rootReducer = combineReducers({
  generalSettings: generalSettingsReducer,
  notificationSettings: notificationSettingsReducer,
  appearanceSettings: appearanceSettingsReducer,
  advancedSettings: advancedSettingsReducer,
});

export default rootReducer;
