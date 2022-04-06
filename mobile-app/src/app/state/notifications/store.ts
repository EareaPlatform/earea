import * as remx from 'remx';

export interface INotificationsStore {
  isInit: boolean;
  notifications: NotificationData[];
}

const initialState: INotificationsStore = {
  isInit: false,
  notifications: [],
};

const state: INotificationsStore = remx.state(initialState);

const getters = remx.getters({
  isInit(): boolean {
    return state.isInit;
  },
  notifications(): NotificationData[] {
    return state.notifications;
  },
});

const setters = remx.setters({
  isInit(value: boolean): void {
    state.isInit = value;
  },
  notifications(notifications: NotificationData[]): void {
    state.notifications = notifications;
  },
});

export const notificationsStore = {
  getters,
  setters,
};
