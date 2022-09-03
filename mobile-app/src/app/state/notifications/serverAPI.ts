import {fetchService} from '../../../services/fetch';
import {getUrl} from '../../../constants/serverConfigs';

const getNotificationsListEndpoint = 'getNotifications';

const getNotifications = async (): Promise<NotificationData[]> => {
  let data: NotificationData[] = [];

  try {
    data = (await fetchService.fetch(getUrl(getNotificationsListEndpoint), {
      method: 'GET',
    })).notificationsData as NotificationData[];

    data = data.reduce((previousArray: NotificationData[], currentNotification) => {
      return [
        ...previousArray, {
          ...currentNotification,
          time: new Date(currentNotification.time),
        },
      ];
    }, []);
  } catch (err: any) {
    console.warn(err?.message);
  } finally {
    return data;
  }
};

export const serverAPI = {
  getNotifications,
};
