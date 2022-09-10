import {useCallback, useEffect} from 'react';
import {useConnect} from 'remx';
import {settingsStore as store} from './store';
import * as actions from './actions';

export interface UseSettingsStore {
  loaded: boolean;
  isNotificationsEnabled: boolean;
  userDisplayName: string;
  bluetoothMACId: string;
  phoneNotificationToken: string;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useSettingsStore = (): UseSettingsStore => {
  useEffect(() => {
    actions.initIfNeeded();
  }, []);

  const {
    loaded,
    isNotificationsEnabled,
    userDisplayName,
    bluetoothMACId,
    phoneNotificationToken,
  } = useConnect(() => ({
    loaded: store.getters.isInit(),
    isNotificationsEnabled: store.getters.isNotificationsEnabled(),
    userDisplayName: store.getters.userDisplayName(),
    bluetoothMACId: store.getters.bluetoothMACId(),
    phoneNotificationToken: store.getters.phoneNotificationToken(),
  }));

  const updateSettings = useCallback((settings: Partial<UserSettings>) => {
    actions.updateSettings(settings);
  }, []);

  return {
    loaded,
    isNotificationsEnabled,
    userDisplayName,
    bluetoothMACId,
    phoneNotificationToken,
    updateSettings,
  };
};
