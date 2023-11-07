import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { stateDiaryList } from '../states/stateDiaryList';
import database from '@react-native-firebase/database';

export const useGetDiaryList = () => {
  const setDiaryList = useSetRecoilState(stateDiaryList);

  return useCallback(async (userInfo) => {
    // 로그인한 유저 조회
    const userDiaryDB = database().ref(`diary/${userInfo.uid}`);
    // 유저가 작성한 글 조회
    const diaryListResult = await userDiaryDB.once('value').then((snapshot) => {
      return snapshot.val();
    });
    // 작성한 글 매핑하도록 변환
    const list = Object.keys(diaryListResult).map((key) => diaryListResult[key]);
    setDiaryList(list);
  }, []);
};

export const useFormatDate = (date) => {
  const targetDate = new Date(date);
  return `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, 0)}-${String(
    targetDate.getDate()
  ).padStart(2, 0)}`;
};
