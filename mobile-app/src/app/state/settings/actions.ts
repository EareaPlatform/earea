/* eslint-disable @typescript-eslint/ban-ts-comment */
import {settingsStore} from './store';
import {serverAPI, SetSettingsRequest} from './serverAPI';
import log from '../../../services/log';

const initialize = (settings: UserSettings) => {
  settingsStore.setters.userDisplayName(settings.userDisplayName);
  // @ts-ignore
  settingsStore.setters.isNotificationsEnabled(settings.isNotificationsEnabled === 'true');
  settingsStore.setters.phoneNotificationToken(settings.phoneNotificationToken);
  settingsStore.setters.bluetoothMACId(settings.bluetoothMACId);

  settingsStore.setters.isInit(true);
  log.info('Settings Service', 'initialized data');
};

export const initIfNeeded = async () => {
  if (!settingsStore.getters.isInit()) {
    const data = await (await serverAPI.getSettings()).settings;

    console.log({data});

    initialize(data);
  }
};

export const reload = async () => {
  settingsStore.setters.isInit(false);
  const data = await (await serverAPI.getSettings()).settings;
  initialize(data);
};

export const updateSettings = async (settings: Partial<UserSettings>) => {
  const data: SetSettingsRequest[] = [];

  Object.entries(settings).forEach(([key, val]) => {
    data.push({
      fieldName: key,
      fieldValue: val.toString(),
    });
  });

  await serverAPI.setSettings(data);
};

export const updateCurrentPhoneNoticiationToken = (val: string) => {
  settingsStore.setters.currentPhoneNoticiationToken(val);
};
