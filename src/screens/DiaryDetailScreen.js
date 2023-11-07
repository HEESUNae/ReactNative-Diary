import React, { useCallback, useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormatDate } from '../hooks/useGetDiaryList';

import Header from '../components/header/Header';
import Icon from '../components/Icon';

const DiaryDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { width } = useWindowDimensions();
  const date = useFormatDate(route.params.item.date);

  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5,
    };
  }, [width]);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Icon name="arrow-back" onPress={onPressBack} />
        <Header.Title title="DiaryDetailScreen" />
      </Header>
      <ScrollView style={{ flex: 1 }}>
        {route.params.item.photoUrl !== null ? (
          <Image
            source={{ uri: route.params.item.photoUrl }}
            width={photoSize.photoWidth}
            height={photoSize.photoHeight}
          />
        ) : (
          <View style={[styles.listImageFrame, { width: photoSize.photoWidth, height: photoSize.photoHeight }]} />
        )}
        <View style={styles.listInfoWrap}>
          <View style={styles.listDate}>
            <Text>날짜</Text>
            <Text>{date}</Text>
          </View>
          <View>
            <Text style={styles.listTitle}>{route.params.item.title}</Text>
            <Text>{route.params.item.content}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DiaryDetailScreen;

const styles = StyleSheet.create({
  listInfoWrap: {
    paddingHorizontal: 24,
  },
  listImageFrame: {
    backgroundColor: 'lightgray',
  },
  listDate: {
    flexDirection: 'row',
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 16,
  },
});
