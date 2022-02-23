const prefix = (name: string) => `com-earea-${name}`;

export const screenIds: Record<string, string> = {
  mainScreen: prefix('main-screen'),
  systemPreferences: prefix('system-preferences'),
  demoScreen: prefix('demo'),
};
