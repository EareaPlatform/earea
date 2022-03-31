import {screenIds} from './screenIds';
import {strings} from './strings';

export interface Tab {
  screenId: string;
  title: string;
}

export const mainTab: Tab = {
  screenId: screenIds.mainScreen,
  title: strings.TAB_MAIN_SCREEN_LABEL,
};

export const settingsTab: Tab = {
  screenId: screenIds.settingsScreen,
  title: strings.TAB_SETTINGS_SCREEN_LABEL,
};

export const demoTab: Tab = {
  screenId: screenIds.demoScreen,
  title: strings.TAB_DEMO_LABEL,
};

export const tabsInfo: Tab[] = [
  mainTab,
  settingsTab,
  demoTab,
];
