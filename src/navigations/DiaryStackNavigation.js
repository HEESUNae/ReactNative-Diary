import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiaryListScreen from '../screens/DiaryListScreen';
import DiaryDetailScreen from '../screens/DiaryDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddPasswordScreen from '../screens/AddPasswordScreen';

const Stack = createNativeStackNavigator();

const DiaryStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="DiaryList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DiaryList" component={DiaryListScreen} />
      <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
      <Stack.Screen name="Setting" component={SettingsScreen} />
      <Stack.Screen name="AddPassword" component={AddPasswordScreen} />
    </Stack.Navigator>
  );
};

export default DiaryStackNavigation;
