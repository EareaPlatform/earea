import React, {useCallback} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';
import {ItemToShow, useMainScreen} from './useMainScreen';
import {StyleSheet} from 'react-native';
import ScreenWrapper from '../../common/ScreenWrapper';
import Section from '../../common/Section';

const MainScreen = React.memo(() => {
  const {
    notificationsToShow,
    sensorsToShow,
    showNotifications,
    showSensors,
  } = useMainScreen();

  const renderItem = useCallback((item: ItemToShow) => (
    <View
      key={item.key}
      backgroundColor={Colors.blue80}
      style={styles.item}
      flex
      row
      spread
      centerV
      marginV-s1
      paddingH-s5
    >
      <Text body>{item.title}</Text>
      <Text body>{item.rightText}</Text>
    </View>
  ), []);

  return (
    <ScreenWrapper>
      <Text screenTitle violet30 marginB-20>{strings.MAIN_SCREEN_TITLE}</Text>
      <Section
        headerTitle={strings.MAIN_SCREEN_NOTIFICATIONS_TITLE}
        loading={!showNotifications}
        rightButton={showNotifications ? {label: 'View all'} : undefined}
      >
        {notificationsToShow.map(renderItem)}
      </Section>
      <Section
        headerTitle={strings.MAIN_SCREEN_SENSORS_TITLE}
        loading={!showSensors}
        rightButton={showSensors ? {label: 'View all'} : undefined}
      >
        {sensorsToShow.map(renderItem)}
      </Section>
    </ScreenWrapper>
  );
});

export default MainScreen;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
});
