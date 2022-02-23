import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';

const SystemPreferences = () => {
  return (
    <View flex center bg-white>
      <Text text20 red30>{strings.SYSTEM_PREFERENCES_TEXT}</Text>
    </View>
  );
};

export default SystemPreferences;
