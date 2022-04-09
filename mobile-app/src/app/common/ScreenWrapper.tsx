import React, {PropsWithChildren} from 'react';
import {ScrollView} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Constants, View} from 'react-native-ui-lib';

export interface ScreenWrapperProps {
  scrollable?: boolean;
  withTopBar?: boolean;
}

const ScreenWrapper = (props: PropsWithChildren<ScreenWrapperProps>) => {
  const containerExtraProps = Constants.isIOS ? {'paddingT-75': true} : {'paddingT-20': true};
  const innerExtraProps = props.withTopBar ? {'paddingT-20': true} : {};

  return (
    <View flex useSafeArea bg-white {...containerExtraProps}>
      <ScrollView scrollEnabled={props.scrollable}>
        <GestureHandlerRootView>
          <View flex paddingH-20 {...innerExtraProps}>
            {props.children}
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </View>
  );
};

export default ScreenWrapper;

ScreenWrapper.defaultProps = {
  scrollable: false,
};
