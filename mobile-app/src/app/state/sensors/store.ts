import * as remx from 'remx';

export interface ISensorsStore {
  isInit: boolean;
  sensors: Sensor[];
}

const initialState: ISensorsStore = {
  isInit: false,
  sensors: [],
};

const state: ISensorsStore = remx.state(initialState);

const getters = remx.getters({
  isInit(): boolean {
    return state.isInit;
  },
  sensors(): Sensor[] {
    return state.sensors;
  },
});

const setters = remx.setters({
  isInit(value: boolean): void {
    state.isInit = value;
  },
  sensors(sensors: Sensor[]): void {
    state.sensors = sensors;
  },
});

export const sensorsStore = {
  getters,
  setters,
};
