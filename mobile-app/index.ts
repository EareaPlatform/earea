import {registerScreens} from './src/registerScreens';
import {navigationService} from './src/services/navigation';
import {LogBox} from 'react-native';
import {tabsInfo, Tab} from './src/constants/tabs';
import {loadSkin} from './src/loadSkin';
import {isDevMode} from './src/environment';
import {screenIds} from './src/constants/screenIds';
import {LayoutTabsChildren} from 'react-native-navigation';

LogBox.ignoreAllLogs(true);

loadSkin();
registerScreens();

console.log('Environment:', process.env.NODE_ENV);

navigationService.registerTabs(
  tabsInfo.reduce((previousTabs: LayoutTabsChildren[], currentTab: Tab) => {
    if (!isDevMode && currentTab.screenId === screenIds.demoScreen) {
      return previousTabs;
    } else {
      return [...previousTabs, navigationService.createTab(currentTab.screenId, currentTab.title)];
    }
  }, []),
);
