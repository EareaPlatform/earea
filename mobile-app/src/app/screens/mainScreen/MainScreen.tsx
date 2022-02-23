import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';

const MainScreen = React.memo(() => {
  return (
    <View flex center bg-white>
      <Text text10 blue30>{strings.MAIN_SCREEN_TEXT}</Text>
    </View>
  );
});

export default MainScreen;
