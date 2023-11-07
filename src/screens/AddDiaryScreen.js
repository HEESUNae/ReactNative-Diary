import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useImagePickAndUpload } from '../hooks/useImagePickAndUpload';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Icon from '../components/Icon';
import Header from '../components/header/Header';
import Button from '../components/Button';

const AddDiaryScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5,
    };
  }, [width]);
  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const runImagePickAndUpload = useImagePickAndUpload();

  // 이전페이지로 이동
  const onPressBack = () => {
    navigation.goBack();
  };

  // 선택한 이미지로 변경
  const onPressPhotoItem = useCallback(async () => {
    const result = await runImagePickAndUpload();
    if (result.length > 0) {
      setSelectedPhotoUrl(result[0]);
    }
  }, []);

  const onPressCalender = useCallback(() => {
    setIsVisibleDatePicker(true);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Icon name="close" size={18} onPress={onPressBack} />
        <Header.Title title="AddDiaryScreen" />
      </Header>
      <ScrollView style={{ flex: 1 }}>
        <Button onPress={onPressPhotoItem}>
          {selectedPhotoUrl !== null ? (
            <Image source={{ uri: selectedPhotoUrl }} width={photoSize.photoWidth} height={photoSize.photoHeight} />
          ) : (
            <View
              style={{ backgroundColor: 'lightgray', width: photoSize.photoWidth, height: photoSize.photoHeight }}
            />
          )}
        </Button>
        <Button onPress={onPressCalender}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text>날짜</Text>
            <Text>
              {selectedDate === null
                ? '날짜를 선택해주세요'
                : `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, 0)}-${String(
                    selectedDate.getDate()
                  ).padStart(2, 0)}`}
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={isVisibleDatePicker}
            mode="date"
            locale="ko"
            onConfirm={(date) => {
              setSelectedDate(new Date(date));
              setIsVisibleDatePicker(false);
            }}
            onCancel={() => {
              setIsVisibleDatePicker(false);
            }}
          />
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddDiaryScreen;
