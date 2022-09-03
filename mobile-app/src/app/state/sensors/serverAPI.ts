import {fetchService} from '../../../services/fetch';
import {getUrl} from '../../../constants/serverConfigs';

const getSensorsListEndpoint = 'getSensors';

const getSensors = async (): Promise<Sensor[]> => {
  let data = [];

  try {
    data = await fetchService.fetch(getUrl(getSensorsListEndpoint), {
      method: 'GET',
    });

    data = data.sensorsData;
  } catch (err: any) {
    console.warn(err.message);
  } finally {
    return data as Sensor[];
  }
};

export const serverAPI = {
  getSensors,
};
