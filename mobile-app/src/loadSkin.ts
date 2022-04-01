import {Colors, ThemeManager, Typography} from 'react-native-ui-lib';

export const loadSkin = () => {
  Typography.loadTypographies({
    'header': {...Typography.text60M},
    'body': {...Typography.text80},
    'screenTitle': {...Typography.text20},
  });

  ThemeManager.setComponentTheme('Button', {
    linkColor: Colors.blue30,
    backgroundColor: Colors.blue30,
  });

  ThemeManager.setComponentTheme('Checkbox', {
    color: Colors.blue30,
  });
};
