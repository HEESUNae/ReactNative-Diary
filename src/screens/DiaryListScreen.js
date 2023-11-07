import React, { useCallback } from 'react';
import { View, Text, FlatList, Image, useWindowDimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '../components/header/Header';
import Icon from '../components/Icon';
import Button from '../components/Button';
import { useRecoilValue } from 'recoil';
import { stateDiaryList } from '../states/stateDiaryList';

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

  const data = useRecoilValue(stateDiaryList);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={styles.headerBetween}>
          <Header.Title title="DiaryListScreen" />
          <Icon name="settings" onPress={onPressSettings} size={20} />
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
              {item.photoUrl !== null && (
                <>
                  <Image
                    source={{ uri: item.photoUrl }}
                    width={width - 24 * 2}
                    height={(width - 24 * 2) * 0.5}
                    style={styles.flatListImage}
                  />
                </>
              )}
              <View style={styles.flatListContent}>
                <View>
                  <Text style={styles.flatListTitle}>{item.title}</Text>
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
    paddingVertical: 16,
  },
  flatListImage: {
    borderRadius: 8,
    marginBottom: 4,
  },
  flatListTitle: {
    fontSize: 16,
    marginVertical: 8,
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
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
