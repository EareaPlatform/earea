import {registerScreens} from './src/registerScreens';
import {navigationService} from './src/services/navigation';
import {LogBox} from 'react-native';
import {tabsInfo} from './src/constants/tabs';

LogBox.ignoreAllLogs(true);

registerScreens();
navigationService.registerTabs(tabsInfo.map(tab => navigationService.createTab(tab.screenId, tab.title)));
