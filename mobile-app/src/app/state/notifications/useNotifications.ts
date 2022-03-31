import {useEffect} from 'react';
import {useConnect} from 'remx';
import {notificationsStore} from './store';
import {notificationsActions} from './actions';

export interface UseNotifications {
  notifications: NotificationData[];
  loaded: boolean;
}

export const useNotifications = (): UseNotifications => {
  useEffect(() => {
    notificationsActions.initIfNeeded();
  }, []);

  const {notifications, loaded} = useConnect(() => ({
    notifications: notificationsStore.getters.notifications(),
    loaded: notificationsStore.getters.isInit(),
  }));

  return {
    notifications,
    loaded,
  };
};
