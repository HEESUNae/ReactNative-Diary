import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigation from './navigations/RootStackNavigation';
import SplashView from './SplashView';

const RootApp = () => {
  const [initalized, setIntializes] = useState(false);

  if (!initalized) {
    return <SplashView onFinishLoad={() => setIntializes(true)} />;
  }

  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default RootApp;
