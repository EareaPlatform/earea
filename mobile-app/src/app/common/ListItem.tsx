import React from 'react';
import {Colors, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

export interface ListItemProps {
  id: string;
  title: string;
  rightText: string;
  onPress?: () => void;
}

const ACTIVE_OPACITY = 0.6;

const ListItem = React.memo((props: ListItemProps) => {
  return (
    <View key={props.id}>
      <TouchableOpacity
        useNative
        activeOpacity={props?.onPress ? ACTIVE_OPACITY : 1}
        onPress={props?.onPress}
        backgroundColor={Colors.yellow70}
        style={styles.container}
        row
        spread
        centerV
        marginV-10
        paddingH-30
      >
        <Text bodyMedium>{props.title}</Text>
        <Text body>{props.rightText}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ListItem;

const styles = StyleSheet.create({
  container: {
    height: 65,
    borderRadius: 20,
  },
});
