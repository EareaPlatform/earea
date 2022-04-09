import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {StateScreen, Text, View} from 'react-native-ui-lib';
import ScreenWrapper from '../../common/ScreenWrapper';
import {strings} from '../../../constants/strings';
import ListItem, {ListItemProps} from '../../common/ListItem';

export interface ViewAllScreenProps {
  title: string;
  items: ListItemProps[];
}

const ViewAllScreen = (props: ViewAllScreenProps) => {
  const renderItem = useCallback((item: ListItemProps) => (
    <View key={item.id}>
      <ListItem {...item} />
    </View>
  ), []);

  if (props.items.length === 0) {
    return (
      <StateScreen
        title={strings.VIEW_ALL_SCREEN_EMPTY_STATE_TITLE}
        subtitle={strings.VIEW_ALL_SCREEN_EMPTY_STATE_SUB_TITLE}
      />
    );
  }

  return (
    <ScreenWrapper scrollable withTopBar>
      <Text header>{props.title}</Text>
      <Text subHeader grey40>{strings.VIEW_ALL_SCREEN_SUB_TITLE.replace('%d', props.items.length.toString())}</Text>
      <View flex paddingT-20 style={styles.container}>
        {
          props.items.map(renderItem)
        }
      </View>
    </ScreenWrapper>
  );
};

export default ViewAllScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
