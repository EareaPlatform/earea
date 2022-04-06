import {screenIds} from './constants/screenIds';
import {navigationService} from './services/navigation';
import HomeScreen from './app/screens/homeScreen/';
import SettingsScreen from './app/screens/settingsScreen/';
import DemoScreen from './app/screens/demoScreen/';

export const registerScreens = () => {
  navigationService.registerComponent(screenIds.homeScreen, () => HomeScreen);
  navigationService.registerComponent(screenIds.settingsScreen, () => SettingsScreen);
  navigationService.registerComponent(screenIds.demoScreen, () => DemoScreen);
};
