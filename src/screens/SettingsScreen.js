import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/header/Header';
import Icon from '../components/Icon';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View>
      <Header>
        <Icon name="arrow-back" onPress={onPressBack} />
        <Header.Title title="SETTINGS" />
      </Header>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;
