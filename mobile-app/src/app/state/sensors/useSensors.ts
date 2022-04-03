import {useEffect} from 'react';
import {useConnect} from 'remx';
import {sensorsStore} from './store';
import {sensorsActions} from './actions';

export interface UseSensors {
  sensors: Sensor[];
  loaded: boolean;
}

export const useSensors = (): UseSensors => {
  useEffect(() => {
    sensorsActions.initIfNeeded();
  }, []);

  const {sensors, loaded} = useConnect(() => ({
    sensors: sensorsStore.getters.sensors(),
    loaded: sensorsStore.getters.isInit(),
  }));

  return {
    sensors,
    loaded,
  };
};
