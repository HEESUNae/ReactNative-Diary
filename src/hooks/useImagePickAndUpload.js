import { Platform } from 'react-native';
import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';

export const useImagePickAndUpload = (allowsEditing) => {
  return useCallback(async () => {
    const imagePickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing,
    });

    // 이미지 선택 취소
    if (imagePickResult.canceled) return;

    // 선택된 이미지 리스트
    const pickPhotoResultArray = imagePickResult.assets.map((item) => {
      const uri = item.uri;
      const fileNameArray = uri.split('/');
      const fileName = fileNameArray[fileNameArray.length - 1];

      return {
        uri: uri,
        fileName: fileName,
      };
    });

    // 이미지를 스토리지에 넘겨주기
    const putResultList = await Promise.all(
      pickPhotoResultArray.map((item) => {
        return storage()
          .ref(item.fileName)
          .putFile(Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri)
          .then((result) => storage().ref(result.metadata.fullPath).getDownloadURL());
      })
    );

    return putResultList;
  }, []);
};
