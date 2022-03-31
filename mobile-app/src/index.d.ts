interface Sensor {
  id: string;
  title: string;
  isOnline: boolean;
  lastActivity: Date;
}

interface NotificationData {
  id: string;
  fromSensorId: string;
  time: Date;
}
