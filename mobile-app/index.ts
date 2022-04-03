import {registerScreens} from './src/registerScreens';
import {navigationService} from './src/services/navigation';
import {LogBox} from 'react-native';
import {tabsInfo, Tab} from './src/constants/tabs';
import {loadSkin} from './src/constants/skin';

LogBox.ignoreAllLogs(true);

loadSkin();
registerScreens();

navigationService.registerTabs(
  tabsInfo.map((tab: Tab) => navigationService.createTab(tab.screenId, tab.title)),
);
