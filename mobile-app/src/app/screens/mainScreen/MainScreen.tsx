import React, {useCallback} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';
import {ItemToShow, useMainScreen} from './useMainScreen';
import {ScrollView, StyleSheet} from 'react-native';

const MainScreen = React.memo(() => {
  const {
    notificationsToShow,
    sensorsToShow,
  } = useMainScreen();

  const renderItem = useCallback((item: ItemToShow, color: string) => (
    <View
      key={item.key}
      backgroundColor={color}
      style={styles.item}
      flex
      row
      spread
      centerV
      margin-s1
      paddingH-s5
    >
      <Text grey10>{item.title}</Text>
      <Text grey10>{item.rightText}</Text>
    </View>
  ), []);

  return (
    <View flex bg-white paddingH-20>
      <ScrollView>
        <Text text10 violet30 marginV-s10>{strings.MAIN_SCREEN_TITLE}</Text>
        <View marginB-s10>
          <Text text50 grey10 marginB-s2>{strings.MAIN_SCREEN_NOTIFICATIONS_TITLE}</Text>
          {notificationsToShow.map(item => renderItem(item, Colors.blue70))}
        </View>
        <View marginB-s10>
          <Text text50 grey10 marginB-s2>{strings.MAIN_SCREEN_NOTIFICATIONS_TITLE}</Text>
          {sensorsToShow.map(item => renderItem(item, Colors.green70))}
        </View>
      </ScrollView>
    </View>
  );
});

export default MainScreen;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 50,
  },
});
