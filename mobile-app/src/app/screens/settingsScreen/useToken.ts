import {useCallback, useEffect, useState} from 'react';
import {useSettingsStore} from '../../state/settings/useSettingsStore';

export interface UseTokenProps {
  toggleToast: (message: string) => void;
}

export interface UseToken {
  notificationToken: string;
  currentPhoneNoticiationToken: string;
  setAsActivePhone: () => void;
  clearToken: () => void;
}

export const useToken = (props: UseTokenProps): UseToken => {
  const {
    phoneNotificationToken,
    currentPhoneNoticiationToken,
    updateSettings,
  } = useSettingsStore();

  const [notificationToken, setNotificationToken] = useState(phoneNotificationToken);

  useEffect(() => {
    setNotificationToken(phoneNotificationToken);
  }, [phoneNotificationToken]);

  const {toggleToast: _toggleToast} = props;
  const setAsActivePhone = useCallback(() => {
    updateSettings({
      phoneNotificationToken: currentPhoneNoticiationToken,
    });
    setNotificationToken(currentPhoneNoticiationToken);
    _toggleToast('This phone as been set as active, and will receive notifications');
  }, [_toggleToast, currentPhoneNoticiationToken, updateSettings]);

  const clearToken = useCallback(() => {
    updateSettings({
      phoneNotificationToken: '',
    });
    setNotificationToken('');
    _toggleToast('Removed phone token, no phone will receive notifications');
  }, [_toggleToast, updateSettings]);

  return {
    notificationToken,
    currentPhoneNoticiationToken,
    setAsActivePhone,
    clearToken,
  };
};
