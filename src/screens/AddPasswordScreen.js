import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { stateUserInfo } from '../states/stateUserInfo';

import Header from '../components/header/Header';
import Icon from '../components/Icon';
import PasswordInputBox from '../components/PasswordInputBox';
import { useRecoilState, useRecoilValue } from 'recoil';

const AddPasswordScreen = () => {
  const navigation = useNavigation();
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [isInputFirst, setIsInputFirst] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userInfo, setUserInfo] = useRecoilState(stateUserInfo);

  const onPressBack = () => {
    navigation.goBack();
  };

  const onComplateInputPassword = useCallback(async () => {
    if (firstInput !== secondInput) return;
    const userDB = `/users/${userInfo.uid}`;
    await database().ref(userDB).update({
      password: firstInput,
    });
    setUserInfo((prev) => {
      return {
        ...prev,
        password: firstInput,
      };
    });
    onPressBack();
  }, [firstInput, secondInput, userInfo]);

  useEffect(() => {
    if (firstInput.length < 4 || secondInput.length < 4) return;
    if (firstInput === secondInput) {
      onComplateInputPassword();
    } else {
      setErrorMessage('비밀번호가 다릅니다');
      setSecondInput('');
    }
  }, [firstInput, secondInput]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Icon name="arrow-back" onPress={onPressBack} />
        <Header.Title title={userInfo.password !== '' ? '비밀번호 수정' : '비밀번호 추가'} />
      </Header>
      <View style={{ flex: 1, paddingTop: 32 }}>
        <PasswordInputBox
          value={isInputFirst ? firstInput : secondInput}
          onChangeText={(text) => {
            if (isInputFirst) {
              setFirstInput(text);
              if (text.length === 4) {
                setIsInputFirst(false);
              }
            } else {
              setSecondInput(text);
            }
          }}
          errorMessage={errorMessage}
        />
      </View>
    </View>
  );
};

export default AddPasswordScreen;
