import React from 'react';
import { Pressable } from 'react-native';

const Button = ({ children, onPress }) => {
  return <Pressable onPress={onPress}>{children}</Pressable>;
};

export default Button;
