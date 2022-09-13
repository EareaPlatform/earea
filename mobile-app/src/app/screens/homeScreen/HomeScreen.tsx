import React, {useCallback} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';
import {useHomeScreen} from './useHomeScreen';
import ScreenWrapper from '../../common/ScreenWrapper';
import Section from '../../common/Section';
import ListItem, {ListItemProps} from '../../common/ListItem';

export interface HomeScreenProps {
  componentId: string;
}

const HomeScreen = (props: HomeScreenProps) => {
  const {
    notificationsToShow,
    sensorsToShow,
    showNotifications,
    showSensors,
    notificationViewAllCta,
  } = useHomeScreen({componentId: props.componentId});

  const renderItem = useCallback((item: ListItemProps) => (
    <View key={item.id}>
      <ListItem {...item} />
    </View>
  ), []);

  return (
    <ScreenWrapper>
      <Text screenTitle blue30 marginB-20>{strings.HOME_SCREEN_TITLE}</Text>
      <Section
        headerTitle={strings.HOME_SCREEN_NOTIFICATIONS_TITLE}
        loading={!showNotifications}
        rightButton={notificationViewAllCta}
      >
        {notificationsToShow.map(renderItem)}
      </Section>
      <Section
        headerTitle={strings.HOME_SCREEN_SENSORS_TITLE}
        loading={!showSensors}
      >
        {sensorsToShow.map(renderItem)}
      </Section>
    </ScreenWrapper>
  );
};

export default HomeScreen;
