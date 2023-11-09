import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { stateUserInfo } from '../states/stateUserInfo';
import { useImagePickAndUpload } from '../hooks/useImagePickAndUpload';
import database from '@react-native-firebase/database';

import Header from '../components/header/Header';
import Icon from '../components/Icon';
import Button from '../components/Button';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useRecoilState(stateUserInfo);
  const runImagePickAndUpload = useImagePickAndUpload(false);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressProfile = useCallback(async () => {
    const result = await runImagePickAndUpload();

    if (result.length >= 1) {
      const userDB = `/users/${userInfo.uid}`;
      // 프로필 이미지 변경
      setUserInfo((prev) => {
        return {
          ...prev,
          profileImage: result[0],
        };
      });

      // DB에 이미지 변경된것으로 업데이트
      await database().ref(userDB).update({
        profileImage: result[0],
      });
    }
  }, [userInfo, runImagePickAndUpload]);

  // 페이지 이동
  const onPressAddPassword = useCallback(() => {
    navigation.navigate('AddPassword');
  }, []);

  const onPressClearPassword = useCallback(async () => {
    const userDB = `/users/${userInfo.uid}`;
    await database().ref(userDB).update({
      password: '',
    });
  }, []);

  return (
    <View>
      <Header>
        <Icon name="arrow-back" onPress={onPressBack} />
        <Header.Title title="SETTINGS" />
      </Header>
      <View style={styles.profileContainer}>
        <Button onPress={onPressProfile}>
          <Image source={{ uri: userInfo.profileImage }} width={100} height={100} style={{ borderRadius: 50 }} />
        </Button>
        <Text style={styles.profileName}>{userInfo.name}</Text>
      </View>
      <View style={styles.devider} />
      <Button onPress={onPressAddPassword}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 24,
          }}
        >
          <Text>비밀번호 추가</Text>
          <Icon name="chevron-forward-outline" size={16} />
        </View>
      </Button>
      <Button onPress={onPressClearPassword}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 24,
          }}
        >
          <Text>비밀번호 초기화</Text>
        </View>
      </Button>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
  },
  devider: {
    borderWidth: 0.5,
    marginHorizontal: 24,
    borderColor: 'gray',
  },
});
