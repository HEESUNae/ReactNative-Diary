import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const SplashView = ({ onFinishLoad }) => {
  useEffect(() => {
    onFinishLoad();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SPLASH</Text>
    </View>
  );
};

export default SplashView;
