import {fetchService} from '../../../services/fetch';
import {getUrl} from '../../../constants/serverConfigs';

const getSensorsListEndpoint = 'getSensors';

const getSensors = async (): Promise<Sensor[]> => {
  const data = await fetchService.fetch(getUrl(getSensorsListEndpoint), {
    method: 'GET',
  });

  return data.sensorsData as Sensor[];
};

export const serverAPI = {
  getSensors,
};
