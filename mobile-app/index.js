import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {LogBox} from 'react-native';
import {navigationService} from './src/services/navigation';
import log from './src/services/log';
import {registerScreens} from './src/registerScreens';
import {tabsInfo} from './src/constants/tabs';
import {isDevMode} from './src/constants/environment';
import {screenIds} from './src/constants/screenIds';
import {loadSkin} from './src/loadSkin';
import * as bleService from './src/services/bluetooth';
import * as settingsActions from './src/app/state/settings/actions';

LogBox.ignoreAllLogs(true);

loadSkin();
registerScreens();

log.complex('Environment', process.env.NODE_ENV);

PushNotification.configure({
  onRegister: (token) => {
    log.complex('NOTIFICATION', `Registration token: ${JSON.stringify(token, null, 2)}`);
    settingsActions.updateCurrentPhoneNoticiationToken(token.token);
  },
  onNotification: (notification) => {
    log.complex('NOTIFICATION onNotification', notification);
    bleService.notify();
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: (notification) => {
    log.complex('NOTIFICATION onAction', notification);
    bleService.notify();
  },
  onRegistrationError: (err) => {
    console.error('Notification failed', err.message, err);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

navigationService.registerTabs(
  tabsInfo.reduce((previousTabs, currentTab) => {
    if (!isDevMode && currentTab.screenId === screenIds.demoScreen) {
      return previousTabs;
    } else {
      return [...previousTabs, navigationService.createTab(currentTab.screenId, currentTab.title)];
    }
  }, []),
);
