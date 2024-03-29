import React from 'react';
import {Button, Text, View} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';
import ScreenWrapper from '../../common/ScreenWrapper';
import Section from '../../common/Section';
import {notificationsStore} from '../../state/notifications/store';
import {sensorsStore} from '../../state/sensors/store';
import log from '../../../services/log';
import * as bleService from '../../../services/bluetooth';

interface Action {
  label: string;
  onPress: () => void;
}

const actions: Action[] = [
  {
    label: 'Toggle notifications isInit',
    onPress: () => {
      const currentStatus = notificationsStore.getters.isInit();

      notificationsStore.setters.isInit(!currentStatus);
      log.debug('demo', 'notification isInit is', notificationsStore.getters.isInit());
    },
  },
  {
    label: 'Toggle sensors isInit',
    onPress: () => {
      const currentStatus = sensorsStore.getters.isInit();

      sensorsStore.setters.isInit(!currentStatus);
      log.debug('demo', 'sensors isInit is', sensorsStore.getters.isInit());
    },
  },
  {
    label: 'Notify Bluetooth',
    onPress: async () => {
      await bleService.notify();
    },
  },
];

const DemoScreen = () => {
  return (
    <ScreenWrapper>
      <Text screenTitle green30 marginB-20>{strings.DEMO_SCREEN_TEXT}</Text>
      <Section headerTitle={'Actions'}>
        {
          actions.map((item: Action) => (
            <View flex marginV-10 key={item.label}>
              <Button label={item.label} onPress={item.onPress} />
            </View>
          ))
        }
      </Section>
    </ScreenWrapper>
  );
};

export default DemoScreen;
