import {notificationsStore} from './store';
import {serverAPI} from './serverAPI';
import log from '../../../services/log';

const fetchNotifications = async (): Promise<NotificationData[]> => {
  return await serverAPI.getNotifications();
};

const initialize = (sensors: NotificationData[]) => {
  notificationsStore.setters.notifications(sensors);
  notificationsStore.setters.isInit(true);
  log.info('Notifications Service', 'initialized data');
};

const initIfNeeded = async () => {
  if (!notificationsStore.getters.isInit()) {
    const data = fetchNotifications();
    initialize(await data);
  }
};

const getNotifications = (): NotificationData[] => {
  initIfNeeded();

  return notificationsStore.getters.notifications();
};

export const notificationsActions = {
  initIfNeeded,
  getNotifications,
};
