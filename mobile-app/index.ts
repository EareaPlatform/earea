import {LogBox} from 'react-native';
import {LayoutTabsChildren} from 'react-native-navigation';
import {navigationService} from './src/services/navigation';
import log from './src/services/log';
import {registerScreens} from './src/registerScreens';
import {tabsInfo, Tab} from './src/constants/tabs';
import {isDevMode} from './src/constants/environment';
import {screenIds} from './src/constants/screenIds';
import {loadSkin} from './src/loadSkin';

LogBox.ignoreAllLogs(true);

loadSkin();
registerScreens();

log.complex('Environment', process.env.NODE_ENV);

navigationService.registerTabs(
  tabsInfo.reduce((previousTabs: LayoutTabsChildren[], currentTab: Tab) => {
    if (!isDevMode && currentTab.screenId === screenIds.demoScreen) {
      return previousTabs;
    } else {
      return [...previousTabs, navigationService.createTab(currentTab.screenId, currentTab.title)];
    }
  }, []),
);
