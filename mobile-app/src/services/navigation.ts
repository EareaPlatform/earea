import {ComponentProvider} from 'react-native';
import {
  Navigation,
  LayoutRoot,
  Options,
  LayoutTabsChildren,
} from 'react-native-navigation';
import {Colors} from 'react-native-ui-lib';

export type PassProps = Record<string, any>;

export interface PushScreenProps {
  componentId: string;
  screenId: string;
  passProps?: PassProps;
  options?: Options;
}

export interface ShowModalProps {
  screenName: string;
  passProps?: PassProps;
}

const registerComponent = (componentName: string, componentProvider: ComponentProvider) => {
  Navigation.registerComponent(componentName, componentProvider);
};

const registerTabs = (tabsLayout: LayoutTabsChildren[]) => {
  Navigation.events().registerAppLaunchedListener(() => {
    setRoot({
      root: {
        bottomTabs: {
          children: tabsLayout,
        },
      },
    });
  });
};

const setRoot = (root: LayoutRoot) => {
  Navigation.setRoot(root);
};

const pushScreen = (props: PushScreenProps) => {
  return Navigation.push(props.componentId, {
    component: {
      name: props.screenId,
      passProps: props.passProps,
      options: {
        ...withoutTopBar,
        ...props.options,
      },
    },
  });
};

const showModal = (props: ShowModalProps) => {
  return Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: props.screenName,
            passProps: props.passProps,
          },
        },
      ],
    },
  });
};

const withoutBottomTabs: Options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const withTopBar: Options = {
  topBar: {
    visible: true,
  },
};

const withoutTopBar: Options = {
  topBar: {
    visible: false,
  },
};

const createTab = (screenId: string, tabTitle: string, icon?: any): LayoutTabsChildren => ({
  stack: {
    children: [
      {
        component: {
          name: screenId,
          options: {
            bottomTab: {
              text: tabTitle,
              selectedTextColor: Colors.blue30,
              icon: icon,
            },
            ...withoutTopBar,
          },
        },
      },
    ],
  },
});

export const navigationService = {
  withoutBottomTabs,
  withTopBar,
  withoutTopBar,
  registerComponent,
  registerTabs,
  setRoot,
  pushScreen,
  showModal,
  createTab,
};
