import {sensorsStore} from './store';

const fetchSensors = (): Sensor[] => {
  return [
    {id: 'sensor-1', title: 'Audio 1', isOnline: false, lastActivity: new Date()},
    {id: 'sensor-2', title: 'Audio 2', isOnline: true, lastActivity: new Date()},
    {id: 'sensor-3', title: 'Vibration 1', isOnline: false, lastActivity: new Date()},
  ];
};

const initialize = (sensors: Sensor[]) => {
  sensorsStore.setters.sensors(sensors);
  sensorsStore.setters.isInit(true);
};

const initIfNeeded = () => {
  if (!sensorsStore.getters.isInit()) {
    const data = fetchSensors();
    initialize(data);
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
