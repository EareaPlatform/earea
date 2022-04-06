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

export const AMOUNT_TO_SHOW = 3;

export const useMainScreen = (): UseMainScreen => {
  const {sensors, loaded: showSensors} = useSensors();
  const {notifications, loaded: showNotifications} = useNotifications();

  const notificationsToShow: ItemToShow[] = useMemo(() => _.take(notifications, AMOUNT_TO_SHOW).map((notification: NotificationData) => {
    const sensor = sensors.find((item: Sensor) => item.id === notification.sensorOriginId);

    return {
      key: notification.id,
      title: sensor?.title ?? '',
      rightText: `${notification.time.toLocaleDateString('he-IL')} - ${notification.time.toLocaleTimeString('en-US')}`,
    };
  }), [sensors, notifications]);

  const sensorsToShow: ItemToShow[] = useMemo(() => _.take(sensors, AMOUNT_TO_SHOW).map((sensor: Sensor) => ({
    key: sensor.id,
    title: sensor.title,
    rightText: '',
  })), [sensors]);

  return {
    notificationsToShow,
    sensorsToShow,
    showSensors,
    showNotifications,
  };
};
