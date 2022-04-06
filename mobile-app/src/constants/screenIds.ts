const prefix = (name: string) => `com.earea.${name}`;

export const screenIds = {
  demoScreen: prefix('demo'),
  homeScreen: prefix('home-screen'),
  settingsScreen: prefix('settings-preferences'),
};
