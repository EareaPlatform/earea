import {useSensors} from '../../state/sensors/useSensors';
import {useMemo} from 'react';
import {useNotifications} from '../../state/notifications/useNotifications';
import * as _ from 'lodash';

export interface ItemToShow {
  key: string;
  title: string;
  rightText: string;
}

export interface UseMainScreen {
  notificationsToShow: ItemToShow[];
  sensorsToShow: ItemToShow[];
  showNotifications: boolean;
  showSensors: boolean;
}

export const useMainScreen = (): UseMainScreen => {
  const {sensors, loaded: showSensors} = useSensors();
  const {notifications, loaded: showNotifications} = useNotifications();

  const notificationsToShow: ItemToShow[] = useMemo(() => _.take(notifications, 5).map((notification: NotificationData) => {
    const sensor = sensors.find((item: Sensor) => item.id === notification.fromSensorId);

    return {
      key: notification.id,
      title: sensor ? sensor.title : '',
      rightText: notification.time.toLocaleString(),
    };
  }), [sensors, notifications]);

  const sensorsToShow: ItemToShow[] = useMemo(() => _.take(sensors, 3).map((sensor: Sensor) => ({
    key: sensor.id,
    title: sensor.title,
    rightText: sensor.isOnline ? 'Online' : 'Offline',
  })), [sensors]);

  return {
    notificationsToShow,
    sensorsToShow,
    showSensors,
    showNotifications,
  };
};
