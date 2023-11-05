import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/header/Header';
import Icon from '../components/Icon';

const DiaryDetailScreen = () => {
  const navigation = useNavigation();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Icon name="arrow-back" onPress={onPressBack} />
        <Header.Title title="DiaryDetailScreen" />
      </Header>
    </View>
  );
};

export default DiaryDetailScreen;
