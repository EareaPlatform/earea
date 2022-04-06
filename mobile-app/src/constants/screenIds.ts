const prefix = (name: string) => `com.earea.${name}`;

export const screenIds = {
  demoScreen: prefix('demoScreen'),
  homeScreen: prefix('homeScreen'),
  settingsScreen: prefix('settingsPreferences'),
  viewAllScreen: prefix('viewAll'),
};
