import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Checkbox, Colors, Text, TextField, Typography, View} from 'react-native-ui-lib';
import {useUserSettings} from './useUserSettings';

export interface UserSettingsProps {
  toggleToast: (message: string) => void;
}

export const UserSettings = (props: UserSettingsProps) => {
  const {
    displayName,
    setDisplayName,
    enableNotification,
    setEnableNotification,
    saveUserSettings,
  } = useUserSettings({toggleToast: props.toggleToast});

  return (
    <>
      <View row spread centerV marginB-10>
        <Text header $textNeutralHeavy>User Settings</Text>
        <Button
          label={'Save'}
          labelStyle={Typography.text70}
          style={styles.button}
          onPress={saveUserSettings}
        />
      </View>

      <TextField
        migrate
        label={'Display name'}
        labelStyle={styles.label}
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
      />

      <Checkbox
        label={'Enable notifications'}
        labelStyle={styles.label}
        color={Colors.black}
        value={enableNotification}
        onValueChange={setEnableNotification}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: Colors.$backgroundNeutralLight,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.$backgroundNeutralMedium,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    padding: 0,
    margin: 0,
  },
  label: {
    color: Colors.$textNeutral,
  },
});
