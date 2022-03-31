import React, {PropsWithChildren} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';

export interface ScreenWrapperProps {
  scrollable?: boolean;
}

const ScreenWrapper = (props: PropsWithChildren<ScreenWrapperProps>) => {
  return (
    <View flex marginT-70>
      <ScrollView scrollEnabled={props.scrollable}>
        <View flex bg-white paddingH-20>
          {props.children}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScreenWrapper;

ScreenWrapper.defaultProps = {
  scrollable: false,
};
