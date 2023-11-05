import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import HeaderTitle from './HeaderTitle';

const Header = ({ children }) => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={[{ paddingTop: insets.top }]}>
          <View style={styles.header}>{children}</View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

Header.Title = HeaderTitle;

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
