import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from '../components/Icon';
import Header from '../components/header/Header';

const AddDiaryScreen = () => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Icon name="close" size={18} onPress={onPressBack} />
        <Header.Title title="AddDiaryScreen" />
      </Header>
      <View>
        <Text>main</Text>
      </View>
    </View>
  );
};

export default AddDiaryScreen;
