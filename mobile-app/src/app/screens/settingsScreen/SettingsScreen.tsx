import React from 'react';
import {View, Text, Checkbox, Button, Assets, TextField, Typography} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';
import Section from '../../common/Section';
import ScreenWrapper from '../../common/ScreenWrapper';
import {ImageURISource} from 'react-native';
import {useSettingsStore} from '../../state/settings/useSettingsStore';

export interface NotificationField {
  id: string;
  label: string;
  value?: string | boolean | number;
  type?: 'checkBox';
}

export interface SensorActionField {
  id: string;
  label: string;
  onPress?: () => void;
  icon?: ImageURISource | number;
}

const notificationsFields: NotificationField[] = [
  {
    id: 'is_notifications_enabled',
    label: 'Pause notifications',
    value: false,
    type: 'checkBox',
  },
  {
    id: 'notifications_area',
    label: 'Pause notification by area',
  },
  {
    id: 'notification_time',
    label: 'Pause notification by time',
  },
];

const sensorsFields: SensorActionField[] = [
  {
    id: 'configure_sensor',
    label: 'Configure new sensor',
    icon: Assets.icons.plusSmall,
  },
  {
    id: 'edit_sensors',
    label: 'Edit sensors',
    icon: Assets.icons.plusSmall,
  },
];

const SettingsScreen = () => {
  const {
    // isNotificationsEnabled,
    userDisplayName,
    bluetoothMACId,
    phoneNotificationToken,
    // updateSettings,
  } = useSettingsStore();

  return (
    <ScreenWrapper>
      <Text screenTitle red30 marginB-20>{strings.SETTINGS_SCREEN_TITLE}</Text>

      <Text text30M marginV-20>User Settings</Text>

      <TextField
        marginV-20
        migrate
        label={'Display name'}
        labelProps={{
          style: Typography.text60BL,
        }}
        value={userDisplayName}
      />

      <Text text30M marginV-20>General Settings</Text>

      <TextField
        marginV-20
        migrate
        label={'Bluetooth MAC id'}
        labelProps={{
          style: Typography.text60BL,
        }}
        value={bluetoothMACId}
      />

      <TextField
        marginV-20
        migrate
        label={'Phone notification token'}
        labelProps={{
          style: Typography.text60BL,
        }}
        value={phoneNotificationToken}
      />

      <Section headerTitle={strings.SETTINGS_SCREEN_NOTIFICATIONS_TITLE} expandable>
        {
          notificationsFields.map((item: NotificationField) => (
            <View flex row spread key={item.id} marginB-10>
              <Text body>{item.label}</Text>
              {
                item.type === 'checkBox' && <Checkbox value={Boolean(item.value)} />
              }
            </View>
          ))
        }
      </Section>
      <Section headerTitle={strings.SETTINGS_SCREEN_SENSORS_TITLE} expandable>
        {
          sensorsFields.map((item: SensorActionField) => (
            <View flex row key={item.id} marginB-10>
              <Button
                link
                label={item.label}
                onPress={item.onPress}
                iconSource={item.icon}
              />
            </View>
          ))
        }
      </Section>
    </ScreenWrapper>
  );
};

export default SettingsScreen;
