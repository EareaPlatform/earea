interface Sensor {
  id: string;
  title: string;
  isOnline: boolean;
  lastActivity: Date;
}

interface NotificationData {
  fromSensorId: string;
  time: Date;
}
