import {screenIds} from './constants/screenIds';
import {navigationService} from './services/navigation';
import HomeScreen from './app/tabs/homeScreen/';
import SettingsScreen from './app/tabs/settingsScreen/';
import DemoScreen from './app/tabs/demoScreen/';
import ViewAllScreen from './app/screens/viewAllScreen';

export const registerScreens = () => {
  navigationService.registerComponent(screenIds.demoScreen, () => DemoScreen);
  navigationService.registerComponent(screenIds.homeScreen, () => HomeScreen);
  navigationService.registerComponent(screenIds.settingsScreen, () => SettingsScreen);
  navigationService.registerComponent(screenIds.viewAllScreen, () => ViewAllScreen);
};
