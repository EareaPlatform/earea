import {screenIds} from './screenIds';
import {strings} from './strings';

interface Tab {
  screenId: string;
  title: string;
}

export const mainTab: Tab = {
  screenId: screenIds.mainScreen,
  title: strings.TAB_MAIN_SCREEN_TITLE,
};

export const systemPreferencesTab: Tab = {
  screenId: screenIds.systemPreferences,
  title: strings.TAB_SYSTEM_PREFERENCES_TITLE,
};

export const demoTab: Tab = {
  screenId: screenIds.demoScreen,
  title: strings.TAB_DEMO_TITLE,
};

export const tabsInfo: Tab[] = [
  mainTab,
  systemPreferencesTab,
  demoTab,
];
