import {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, ToastProps} from 'react-native-ui-lib';

export interface UseToast {
  toastProps: ToastProps;
  toggleToast: (message: string) => void;
}

export const TOAST_DISMISS_TIME = 3000;

export const useToast = (): UseToast => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toastProps = useMemo(() => ({
    visible: isToastVisible,
    message: toastMessage,
    style: styles.toast,
  }), [isToastVisible, toastMessage]);

  const toggleToast = useCallback((message: string) => {
    setIsToastVisible(true);
    setToastMessage(message);

    setTimeout(() => {
      setIsToastVisible(false);
      setToastMessage('');
    }, TOAST_DISMISS_TIME);
  }, []);

  return {
    toastProps,
    toggleToast,
  };
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: Colors.$backgroundSuccessHeavy,
    borderBottomWidth: 1,
    borderBottomColor: Colors.green10,
    paddingVertical: 10,
  },
});
