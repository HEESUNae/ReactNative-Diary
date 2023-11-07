import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';

const SingleLineInput = ({ style, value, onChangeText, placeholder, fontSize, onSubmitEditing }) => {
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
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[style, { fontSize: fontSize ?? 18 }]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default SingleLineInput;
