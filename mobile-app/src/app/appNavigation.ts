import {navigationService} from '../services/navigation';
import {screenIds} from '../constants/screenIds';
import {ViewAllScreenProps} from './screens/viewAllScreen/ViewAllScreen';

const pushViewAllScreen = (componentId: string, props: ViewAllScreenProps) => {
  navigationService.pushScreen({
    componentId,
    passProps: props,
    screenId: screenIds.viewAllScreen,
    options: {
      ...navigationService.withTopBar,
    },
  });
};

export const appNavigation = {
  pushViewAllScreen,
};
