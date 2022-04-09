import {screenIds} from './constants/screenIds';
import {navigationService} from './services/navigation';
import HomeScreen from './app/screens/homeScreen/';
import SettingsScreen from './app/screens/settingsScreen/';
import DemoScreen from './app/screens/demoScreen/';
import ViewAllScreen from './app/screens/viewAllScreen';

export const registerScreens = () => {
  navigationService.registerComponent(screenIds.demoScreen, () => DemoScreen);
  navigationService.registerComponent(screenIds.homeScreen, () => HomeScreen);
  navigationService.registerComponent(screenIds.settingsScreen, () => SettingsScreen);
  navigationService.registerComponent(screenIds.viewAllScreen, () => ViewAllScreen);
};
