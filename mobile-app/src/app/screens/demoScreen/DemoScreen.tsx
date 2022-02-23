import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';

const DemoScreen = () => {
  return (
    <View flex center bg-white>
      <Text text20 green30>{strings.DEMO_SCREEN_TEXT}</Text>
    </View>
  );
};

export default DemoScreen;
