import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Image, useWindowDimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '../components/header/Header';
import Icon from '../components/Icon';
import Button from '../components/Button';

const DiaryListScreen = () => {
  const navigation = useNavigation();
  const safeareaInset = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const onPressSettings = useCallback(() => {
    navigation.navigate('Setting');
  }, []);
  const onPressAdd = useCallback(() => {
    navigation.navigate('AddDiary');
  }, []);

  const [data, setData] = useState([
    {
      id: 0,
      title: 'TITLE_01',
      content: 'CONTENT_01',
      createAt: '2023-11-01',
      updateAt: '2023-11-05',
      imageUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
    },
    {
      id: 1,
      title: 'TITLE_02',
      content: 'CONTENT_02',
      createAt: '2023-11-01',
      updateAt: '2023-11-05',
      imageUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
    },
    {
      id: 2,
      title: 'TITLE_03',
      content: 'CONTENT_03',
      createAt: '2023-11-01',
      updateAt: '2023-11-05',
      imageUrl: null,
    },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={styles.headerBetween}>
          <Header.Title title="DiaryListScreen" />
          <Icon name="settings" onPress={onPressSettings} />
        </View>
      </Header>
      <FlatList
        data={data}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <Button
            onPress={() => {
              navigation.navigate('DiaryDetail', { item });
            }}
          >
            <View style={{ paddingVertical: 12 }}>
              {item.imageUrl !== null && (
                <>
                  <Image
                    source={{ uri: item.imageUrl }}
                    width={width - 24 * 2}
                    height={(width - 24 * 2) * 0.5}
                    style={styles.flatListImage}
                  />
                </>
              )}
              <View style={styles.flatListContent}>
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.content}</Text>
                </View>
                <Text>{item.updateAt}</Text>
              </View>
            </View>
          </Button>
        )}
      />
      <View style={[styles.addListBtnContainer, { bottom: safeareaInset.bottom + 24 }]}>
        <Button>
          <View style={styles.addListBtn}>
            <Icon name="add" color="white" size={30} onPress={onPressAdd} />
          </View>
        </Button>
      </View>
    </View>
  );
};

export default DiaryListScreen;

const styles = StyleSheet.create({
  headerBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatListContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  flatListImage: {
    borderRadius: 8,
    marginBottom: 4,
  },
  flatListContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addListBtnContainer: {
    position: 'absolute',
    right: 12,
  },
  addListBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
