import {notificationsStore} from './store';

const fetchNotifications = (): NotificationData[] => {
  const randomDate = () => {
    const start = new Date(2020, 0, 0);
    const end = new Date();

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  return [
    {id: 'notification-1', fromSensorId: 'sensor-1', time: randomDate()},
    {id: 'notification-2', fromSensorId: 'sensor-1', time: randomDate()},
    {id: 'notification-3', fromSensorId: 'sensor-3', time: randomDate()},
    {id: 'notification-4', fromSensorId: 'sensor-3', time: randomDate()},
    {id: 'notification-5', fromSensorId: 'sensor-2', time: randomDate()},
    {id: 'notification-6', fromSensorId: 'sensor-1', time: randomDate()},
  ];
};

const initialize = (sensors: NotificationData[]) => {
  notificationsStore.setters.notifications(sensors);
  notificationsStore.setters.isInit(true);
};

const initIfNeeded = () => {
  if (!notificationsStore.getters.isInit()) {
    const data = fetchNotifications();
    initialize(data);
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
