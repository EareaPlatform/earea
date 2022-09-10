import * as remx from 'remx';

export interface ISettingsStore {
  isInit: boolean;
  isNotificationsEnabled: boolean;
  userDisplayName: string;
  bluetoothMACId: string;
  phoneNotificationToken: string;
}

const initialState: ISettingsStore = {
  isInit: false,
  isNotificationsEnabled: false,
  userDisplayName: '',
  bluetoothMACId: '',
  phoneNotificationToken: '',
};

const state: ISettingsStore = remx.state(initialState);

const getters = remx.getters({
  isInit(): boolean {
    return state.isInit;
  },
  isNotificationsEnabled(): boolean {
    return state.isNotificationsEnabled;
  },
  userDisplayName(): string {
    return state.userDisplayName;
  },
  bluetoothMACId(): string {
    return state.bluetoothMACId;
  },
  phoneNotificationToken(): string {
    return state.phoneNotificationToken;
  },
});

const setters = remx.setters({
  isInit(value: boolean): void {
    state.isInit = value;
  },
  isNotificationsEnabled(value: boolean): void {
    state.isNotificationsEnabled = value;
  },
  userDisplayName(displayName: string): void {
    state.userDisplayName = displayName;
  },
  bluetoothMACId(_bluetoothMACId: string): void {
    state.bluetoothMACId = _bluetoothMACId;
  },
  phoneNotificationToken(phoneNotificationToken: string): void {
    state.phoneNotificationToken = phoneNotificationToken;
  },
});

export const settingsStore = {
  getters,
  setters,
};
