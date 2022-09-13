import React from 'react';
import {Text} from 'react-native-ui-lib';
import {strings} from '../../../constants/strings';
import ScreenWrapper from '../../common/ScreenWrapper';
import {useToast} from './useToast';
import {UserSettings} from './UserSettings';
import {GeneralSettings} from './GeneralSettings';
import {TokenSettings} from './TokenSettings';

const SettingsScreen = () => {
  const {
    toastProps,
    toggleToast,
  } = useToast();

  const commonProps = {toggleToast};

  return (
    <ScreenWrapper scrollable toastProps={toastProps}>
      <Text screenTitle $textGeneral marginB-20>
        {strings.SETTINGS_SCREEN_TITLE}
      </Text>

      <UserSettings {...commonProps} />
      <GeneralSettings {...commonProps} />
      <TokenSettings {...commonProps} />
    </ScreenWrapper>
  );
};

export default SettingsScreen;
