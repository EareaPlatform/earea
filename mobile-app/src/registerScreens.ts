import {screenIds} from './constants/screenIds';
import {navigationService} from './services/navigation';
import MainScreen from './app/screens/mainScreen/';
import SettingsScreen from './app/screens/settingsScreen/';
import DemoScreen from './app/screens/demoScreen/';

export const registerScreens = () => {
  navigationService.registerComponent(screenIds.mainScreen, () => MainScreen);
  navigationService.registerComponent(screenIds.settingsScreen, () => SettingsScreen);
  navigationService.registerComponent(screenIds.demoScreen, () => DemoScreen);
};
