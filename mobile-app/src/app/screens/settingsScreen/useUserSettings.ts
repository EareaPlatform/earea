import {useCallback, useEffect, useState} from 'react';
import {useSettingsStore} from '../../state/settings/useSettingsStore';

export interface UseUserSettingsProps {
  toggleToast: (message: string) => void;
}

export interface UseUserSettings {
  displayName: string;
  setDisplayName: (val: string) => void;
  enableNotification: boolean;
  setEnableNotification: (val: boolean) => void;
  saveUserSettings: () => void;
}

export const useUserSettings = (props: UseUserSettingsProps): UseUserSettings => {
  const {
    isNotificationsEnabled,
    userDisplayName,
    updateSettings,
  } = useSettingsStore();

  const [displayName, setDisplayName] = useState(userDisplayName);
  const [enableNotification, setEnableNotification] = useState(false);

  useEffect(() => {
    setDisplayName(userDisplayName);
    setEnableNotification(isNotificationsEnabled);
  }, [isNotificationsEnabled, userDisplayName]);

  const {toggleToast: _toggleToast} = props;
  const saveUserSettings = useCallback(() => {
    updateSettings({
      userDisplayName: displayName,
      isNotificationsEnabled: enableNotification,
    });
    _toggleToast('User settings as been saved');
  }, [_toggleToast, displayName, enableNotification, updateSettings]);

  return {
    enableNotification,
    displayName,
    setDisplayName,
    setEnableNotification,
    saveUserSettings,
  };
};
