import { View, TextInput, Text, StyleSheet } from 'react-native';
import React from 'react';

const PasswordInputBox = ({ value, onChangeText, errorMessage }) => {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24 }}>
        <TextInput
          autoFocus
          value={value}
          onChangeText={onChangeText}
          caretHidden
          keyboardType="number-pad"
          maxLength={4}
          style={styles.input}
        />
        {[0, 1, 2, 3].map((item) => {
          return (
            <View
              key={item}
              style={[
                styles.inputBar,
                {
                  marginRight: item !== 3 ? 12 : 0,
                  borderColor: errorMessage ? 'red' : 'black',
                },
              ]}
            >
              {value.length > item && (
                <View style={[styles.inputDot, { backgroundColor: errorMessage ? 'red' : 'black' }]} />
              )}
            </View>
          );
        })}
      </View>
      {errorMessage && (
        <View style={styles.inputErrorWrap}>
          <Text style={styles.inputErrorText}>{errorMessage}</Text>
        </View>
      )}
    </>
  );
};

export default PasswordInputBox;

const styles = StyleSheet.create({
  inputBar: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  input: {
    width: 20,
    height: 20,
    opacity: 0,
    position: 'absolute',
  },
  inputDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  inputErrorWrap: {
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  inputErrorText: {
    color: 'red',
    fontSize: 18,
  },
});
