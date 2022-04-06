import {useSensors} from '../../state/sensors/useSensors';
import {useMemo} from 'react';
import {useNotifications} from '../../state/notifications/useNotifications';
import * as _ from 'lodash';
import {ButtonProps} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';
import {appNavigation} from '../../appNavigation';

export interface ItemToShow {
  key: string;
  title: string;
  rightText: string;
}

export interface UseHomeScreenProps {
  componentId: string;
}

export interface UseHomeScreen {
  notificationsToShow: ItemToShow[];
  sensorsToShow: ItemToShow[];
  showNotifications: boolean;
  showSensors: boolean;
  notificationViewAllCta?: ButtonProps;
  sensorsViewAllCta?: ButtonProps;
}

export const AMOUNT_TO_SHOW = 3;

export const useHomeScreen = (props: UseHomeScreenProps): UseHomeScreen => {
  const {sensors, loaded: showSensors} = useSensors();
  const {notifications, loaded: showNotifications} = useNotifications();

  const notificationsToShow: ItemToShow[] = useMemo(() => _.take(notifications, AMOUNT_TO_SHOW).map((notification: NotificationData) => {
    return serializeNotification(notification, sensors);
  }), [sensors, notifications]);

  const sensorsToShow: ItemToShow[] = useMemo(() => _.take(sensors, AMOUNT_TO_SHOW).map((sensor: Sensor) => serializeSensor(sensor)), [sensors]);

  const notificationViewAllCta = useMemo(() => {
    if (showNotifications && sensors?.length > AMOUNT_TO_SHOW) {
      return {
        label: strings.HOME_SCREEN_NOTIFICATIONS_EXPAND_CTA,
        onPress: () => appNavigation.pushViewAllScreen(props.componentId, {
          title: strings.HOME_SCREEN_NOTIFICATIONS_TITLE,
          items: notifications.map((notification: NotificationData) => {
            return serializeNotification(notification, sensors);
          }),
        }),
      };
    } else {
      return undefined;
    }
  }, [notifications, props.componentId, sensors, showNotifications]);

  const sensorsViewAllCta = useMemo(() => {
    if (showSensors && notifications?.length > AMOUNT_TO_SHOW) {
      return {
        label: strings.HOME_SCREEN_SENSORS_EXPAND_CTA,
        onPress: () => appNavigation.pushViewAllScreen(props.componentId, {
          title: strings.HOME_SCREEN_SENSORS_TITLE,
          items: sensors.map((sensor: Sensor) => {
            return serializeSensor(sensor);
          }),
        }),
      };
    } else {
      return undefined;
    }
  }, [notifications?.length, props.componentId, sensors, showSensors]);

  return {
    notificationsToShow,
    sensorsToShow,
    showSensors,
    showNotifications,
    notificationViewAllCta,
    sensorsViewAllCta,
  };
};

const serializeNotification = (notification: NotificationData, sensors: Sensor[]): ItemToShow => {
  const sensor = sensors.find((item: Sensor) => item.id === notification.sensorOriginId);

  return {
    key: notification.id,
    title: sensor?.title ?? '',
    rightText: `${notification.time.getHours()}:${notification.time.getMinutes()} - ${notification.time.toLocaleDateString('he-IL')}`,
  };
};

const serializeSensor = (sensor: Sensor): ItemToShow => ({
  key: sensor.id,
  title: sensor.title,
  rightText: '',
});
