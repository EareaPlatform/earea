import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Colors, Text, View} from 'react-native-ui-lib';
import {useToken} from './useToken';

export interface TokenSettingsProps {
  toggleToast: (message: string) => void;
}

export const TokenSettings = (props: TokenSettingsProps) => {
  const {
    notificationToken,
    currentPhoneNoticiationToken,
    setAsActivePhone,
    clearToken,
  } = useToken({toggleToast: props.toggleToast});

  return (
    <>
      <Text header marginT-60 marginB-10 $textNeutralHeavy>Token Settings</Text>
      <Text style={styles.label}>Current phone notification token:</Text>
      <View style={styles.currentToken} marginT-4 marginB-20 padding-20>
        <Text $textNeutralLight>{notificationToken}</Text>
        <View flex right marginT-20>
          <Button
            label={'Clear token'}
            outlineColor={Colors.$textNeutral}
            backgroundColor={Colors.$textNeutral}
            onPress={clearToken}
            marginV-10
          />
        </View>
      </View>
      <View flex centerV padding-20 style={styles.hint}>
        <Text text70 marginB-8>This is your token:</Text>
        <Text>{currentPhoneNoticiationToken}</Text>
        <View flex right marginT-20>
          <Button
            label={'Set as active phone'}
            outlineColor={Colors.$textSuccess}
            backgroundColor={Colors.$textSuccess}
            onPress={setAsActivePhone}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.$textNeutral,
  },
  hint: {
    backgroundColor: Colors.$backgroundSuccessLight,
    borderRadius: 10,
  },
  currentToken: {
    backgroundColor: Colors.$backgroundNeutralLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.$backgroundNeutralMedium,
    borderRadius: 10,
  },
});
