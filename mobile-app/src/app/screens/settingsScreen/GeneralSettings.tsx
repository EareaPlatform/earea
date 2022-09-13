import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Colors, Text, TextField, Typography, View} from 'react-native-ui-lib';
import {useSettingsStore} from '../../state/settings/useSettingsStore';
import * as bleService from '../../../services/bluetooth';

export interface GeneralSettingsProps {
  toggleToast: (message: string) => void;
}

export const GeneralSettings = (props: GeneralSettingsProps) => {
  const {
    bluetoothMACId,
    updateSettings,
  } = useSettingsStore();

  const [_bluetoothMACId, _setBluetoothMACId] = useState(bluetoothMACId);

  useEffect(() => {
    _setBluetoothMACId(bluetoothMACId);
  }, [bluetoothMACId]);

  const {toggleToast: _toggleToast} = props;
  const saveGeneralSettings = useCallback(() => {
    updateSettings({
      bluetoothMACId: _bluetoothMACId,
    });
    _toggleToast('General settings as been saved');
  }, [_bluetoothMACId, _toggleToast, updateSettings]);

  const testBluetooth = useCallback(async () => {
    await bleService.notify();
  }, []);

  return (
    <>
      <View row spread centerV marginT-60 marginB-10>
        <Text header $textNeutralHeavy>General Settings</Text>
        <Button
          label={'Save'}
          labelStyle={Typography.text70}
          style={styles.button}
          onPress={saveGeneralSettings}
        />
      </View>
      <TextField
        migrate
        label={'Bluetooth MAC id'}
        labelStyle={styles.label}
        style={styles.input}
        value={_bluetoothMACId}
        onChangeText={_setBluetoothMACId}
      />
      <View flex right centerV>
        <Button
          label={'Test bluetooth'}
          onPress={testBluetooth}
          outlineColor={Colors.$textNeutral}
          backgroundColor={Colors.$textNeutral}
        />
      </View>
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
