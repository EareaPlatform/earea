import {sensorsStore} from './store';
import {serverAPI} from './serverAPI';
import log from '../../../services/log';

const fetchSensors = async (): Promise<Sensor[]> => {
  return serverAPI.getSensors();
};

const initialize = (sensors: Sensor[]) => {
  sensorsStore.setters.sensors(sensors);
  sensorsStore.setters.isInit(true);
  log.info('Sensors Service', 'initialized data');
};

const initIfNeeded = async () => {
  if (!sensorsStore.getters.isInit()) {
    const data = fetchSensors();
    initialize(await data);
  }
};

const getSensors = (): Sensor[] => {
  initIfNeeded();

  return sensorsStore.getters.sensors();
};

export const sensorsActions = {
  initIfNeeded,
  getSensors,
};
