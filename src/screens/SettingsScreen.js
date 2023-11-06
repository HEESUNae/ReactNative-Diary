import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { stateUserInfo } from '../states/statusUserInfo';
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

  return (
    <View>
      <Header>
        <Icon name="arrow-back" onPress={onPressBack} />
        <Header.Title title="SETTINGS" />
      </Header>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={onPressProfile}>
          <Image source={{ uri: userInfo.profileImage }} width={100} height={100} style={{ borderRadius: 50 }} />
        </Button>
        <Text style={styles.profileName}>{userInfo.name}</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  profileName: {
    marginTop: 10,
    fontSize: 20,
  },
});
