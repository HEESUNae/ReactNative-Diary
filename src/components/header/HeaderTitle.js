import React from 'react';
import { Text } from 'react-native';

const HeaderTitle = ({ title, size = 16, weight }) => {
  return <Text style={{ fontSize: size, fontWeight: weight }}>{title}</Text>;
};

export default HeaderTitle;
