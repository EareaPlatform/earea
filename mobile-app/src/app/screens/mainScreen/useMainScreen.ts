export interface ItemToShow {
  key: string;
  title: string;
  rightText: string;
}

export interface UseMainScreen {
  notificationsToShow: ItemToShow[];
  sensorsToShow: ItemToShow[];
}

const sensors: Sensor[] = [
  {id: 'sensor-1', title: 'Audio 1', isOnline: false, lastActivity: new Date()},
  {id: 'sensor-2', title: 'Audio 2', isOnline: true, lastActivity: new Date()},
  {id: 'sensor-3', title: 'Vibration 1', isOnline: false, lastActivity: new Date()},
];

export const useMainScreen = (): UseMainScreen => {
  const notificationsToShow: ItemToShow[] = [
    {key: 'item-0', title: sensors[0].title, rightText: sensors[0].lastActivity.toLocaleTimeString()},
    {key: 'item-1', title: sensors[2].title, rightText: sensors[2].lastActivity.toLocaleTimeString()},
    {key: 'item-2', title: sensors[1].title, rightText: sensors[1].lastActivity.toLocaleTimeString()},
  ];

  const sensorsToShow: ItemToShow[] = [
    {key: 'sensor-0', title: sensors[0].title, rightText: sensors[0].isOnline ? 'Online' : 'Offline'},
    {key: 'sensor-1', title: sensors[2].title, rightText: sensors[2].isOnline ? 'Online' : 'Offline'},
    {key: 'sensor-2', title: sensors[1].title, rightText: sensors[1].isOnline ? 'Online' : 'Offline'},
  ];

  return {
    notificationsToShow,
    sensorsToShow,
  };
};
