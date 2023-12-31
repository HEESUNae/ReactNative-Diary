import { View, TextInput } from 'react-native';
import React, { useState } from 'react';

const MultiLineInput = ({ value, onChangeText, placeholder, style, fontSize, onSubmitEditing, height }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: focused ? 'black' : 'gray',
      }}
    >
      <TextInput
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[style, { fontSize: fontSize ?? 18, height: height ?? 200 }]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default MultiLineInput;
