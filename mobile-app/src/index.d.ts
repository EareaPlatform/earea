enum SensorType {
  VIBRATION = 'vibration-sensor',
  SOUND = 'sound-sensor',
}

interface Sensor {
  id: string;
  type: SensorType;
  title: string;
  isOnline: boolean;
  lastActivity: Date;
}

interface NotificationData {
  id: string;
  sensorOriginId: string;
  time: Date;
}

interface UserSettings {
  isNotificationsEnabled: boolean;
  userDisplayName: string;
  bluetoothMACId: string;
  phoneNotificationToken: string;
}
