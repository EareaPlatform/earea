import {fetchService} from '../../../services/fetch';
import {getUrl} from '../../../constants/serverConfigs';

const getNotificationsListEndpoint = 'getNotifications';

const getNotifications = async (): Promise<NotificationData[]> => {
  const data = (await fetchService.fetch(getUrl(getNotificationsListEndpoint), {
    method: 'GET',
  })).notificationsData as NotificationData[];

  return data.reduce((previousArray: NotificationData[], currentNotification) => {
    return [
      ...previousArray, {
        ...currentNotification,
        time: new Date(currentNotification.time),
      },
    ];
  }, []);
};

export const serverAPI = {
  getNotifications,
};
