import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import database from '@react-native-firebase/database';
import { useSetRecoilState } from 'recoil';
import { stateUserInfo } from './states/stateUserInfo';
import { useGetDiaryList } from './hooks/useGetDiaryList';

const SplashView = ({ onFinishLoad }) => {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const setUserInfo = useSetRecoilState(stateUserInfo);
  const runGetDiaryList = useGetDiaryList();

  // 유저 식별
  const signInUserIdentify = useCallback(async (idToken) => {
    // 토큰 자격증명
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // 로그인 시도 (성공시 사용자 정보 반환)
    const result = await auth().signInWithCredential(googleCredential);

    // DB에서 유저 정보 가져오기 (유저 여부 확인)
    const userDBKey = `/users/${result.user.uid}`;
    const userResult = await database()
      .ref(userDBKey)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });

    const now = new Date().toISOString();

    if (userResult === null) {
      // DB에 접속 히스토리 유저 데이터 저장
      await database().ref(userDBKey).set({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
        uid: result.user.uid,
        password: '',
        createAt: now,
        lastLoginAt: now,
      });
    } else {
      // 마지막 로그인 시간 업데이트
      await database().ref(userDBKey).update({
        lastLoginAt: now,
      });
    }

    // DB에서 유저 정보 가져오기
    const userInfo = await database()
      .ref(userDBKey)
      .once('value')
      .then((snapshot) => snapshot.val());

    // 로그인한 유저 정보 recoil에 저장
    setUserInfo(userInfo);
    // 유저가 작성한 글 가져오기
    runGetDiaryList(userInfo);
    onFinishLoad();
  }, []);

  // 로그인 버튼 클릭시
  const onPressGoogleLogin = useCallback(async () => {
    // 구글플레이 설치여부 확인
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // 토큰
    const { idToken } = await GoogleSignin.signIn();
    signInUserIdentify(idToken);
  }, []);

  // 로그인 실행
  const userSilentLogin = useCallback(async () => {
    try {
      // 구글 로그인 호출
      const { idToken } = await GoogleSignin.signInSilently();
      signInUserIdentify(idToken);
    } catch (e) {
      setShowLoginButton(true);
    }
  }, []);

  useEffect(() => {
    userSilentLogin();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {showLoginButton && <GoogleSigninButton onPress={onPressGoogleLogin} />}
    </View>
  );
};

export default SplashView;
