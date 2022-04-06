import React, {useCallback} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';
import {ItemToShow, useHomeScreen} from './useHomeScreen';
import {StyleSheet} from 'react-native';
import ScreenWrapper from '../../common/ScreenWrapper';
import Section from '../../common/Section';

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
    sensorsViewAllCta,
  } = useHomeScreen({componentId: props.componentId});

  const renderItem = useCallback((item: ItemToShow) => (
    <View
      key={item.key}
      backgroundColor={Colors.yellow70}
      style={styles.item}
      row
      spread
      centerV
      marginV-10
      paddingH-30
    >
      <Text bodyMedium>{item.title}</Text>
      <Text body>{item.rightText}</Text>
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
        rightButton={sensorsViewAllCta}
      >
        {sensorsToShow.map(renderItem)}
      </Section>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  item: {
    height: 70,
    borderRadius: 20,
  },
});
