import * as remx from 'remx';

export interface ISettingsStore {
  isInit: boolean;
  isNotificationsEnabled: boolean;
  userDisplayName: string;
  bluetoothMACId: string;
  phoneNotificationToken: string;
  currentPhoneNoticiationToken: string;
}

const initialState: ISettingsStore = {
  isInit: false,
  isNotificationsEnabled: false,
  userDisplayName: '',
  bluetoothMACId: '',
  phoneNotificationToken: '',
  currentPhoneNoticiationToken: '',
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
  currentPhoneNoticiationToken(): string {
    return state.currentPhoneNoticiationToken;
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
  currentPhoneNoticiationToken(currentPhoneNoticiationToken: string): void {
    state.currentPhoneNoticiationToken = currentPhoneNoticiationToken;
  },
});

export const settingsStore = {
  getters,
  setters,
};
