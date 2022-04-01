import React, {PropsWithChildren} from 'react';
import {ScrollView} from 'react-native';
import {Constants, View} from 'react-native-ui-lib';

export interface ScreenWrapperProps {
  scrollable?: boolean;
}

const ScreenWrapper = (props: PropsWithChildren<ScreenWrapperProps>) => {
  const extraProps = Constants.isIOS ? {'paddingT-70': true} : {'paddingT-20': true};

  return (
    <View flex bg-white {...extraProps}>
      <ScrollView scrollEnabled={props.scrollable}>
        <View flex paddingH-20>
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
