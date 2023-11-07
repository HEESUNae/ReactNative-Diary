import { useCallback } from 'react';
import database from '@react-native-firebase/database';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { stateUserInfo } from '../states/stateUserInfo';
import { stateDiaryList } from '../states/stateDiaryList';

export const useCreateDiary = () => {
  const userInfo = useRecoilValue(stateUserInfo);
  const setDiaryList = useSetRecoilState(stateDiaryList);

  return useCallback(async (photoUrl, date, title, content) => {
    if (date === null || content === '' || title === '') return <></>;

    // 현재 시간
    const now = new Date().toISOString().at;

    // DB에 유저 리스트 등록
    const userDiaryDB = database().ref(`diary/${userInfo.uid}`).push();
    const saveItem = {
      photoUrl,
      title,
      content,
      date: date.toISOString(),
      createAt: now,
      updateAt: now,
    };

    // DB에 다이어리 데이터 저장
    await userDiaryDB.set(saveItem);

    setDiaryList((prev) => {
      return prev.concat([saveItem]);
    });
  }, []);
};
