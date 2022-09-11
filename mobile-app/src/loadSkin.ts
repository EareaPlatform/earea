import {Colors, ThemeManager, Typography} from 'react-native-ui-lib';

export const loadSkin = () => {
  Typography.loadTypographies({
    'screenTitle': {...Typography.text20BO, fontStyle: 'italic'},
    'header': {...Typography.text60M},
    'subHeader': {...Typography.text80M},
    'body': {...Typography.text80},
    'bodyMedium': {...Typography.text80M},
    'bodyBold': {...Typography.text80BO},
  });

  ThemeManager.setComponentTheme('Button', {
    linkColor: Colors.blue30,
    outlineColor: Colors.blue30,
    backgroundColor: Colors.blue30,
  });

  ThemeManager.setComponentTheme('Checkbox', {
    color: Colors.blue30,
  });
};
