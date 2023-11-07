import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useImagePickAndUpload } from '../hooks/useImagePickAndUpload';
import { useCreateDiary } from '../hooks/useCreateDiary';

import Icon from '../components/Icon';
import Header from '../components/header/Header';
import Button from '../components/Button';
import SingleLineInput from '../components/SingleLineInput';
import MultiLineInput from '../components/MultiLineInput';

const AddDiaryScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const runImagePickAndUpload = useImagePickAndUpload();
  const runCreateDiary = useCreateDiary();

  // DatePicker
  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // DiaryList value
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5,
    };
  }, [width]);

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

  // 캘린더 visible
  const onPressCalender = useCallback(() => {
    setIsVisibleDatePicker(true);
  }, []);

  // input value check
  const canSave = useMemo(() => {
    if (selectedDate === null || title === '' || content === '') return false;
    return true;
  }, [selectedDate, title, content]);

  const onPressSave = useCallback(() => {
    if (!canSave) return;
    runCreateDiary(selectedPhotoUrl, selectedDate, title, content);
    onPressBack();
  }, [canSave, selectedPhotoUrl, selectedDate, title, content]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Icon name="close" size={18} onPress={onPressBack} />
        <Header.Title title="AddDiaryScreen" />
      </Header>
      <ScrollView>
        <Button onPress={onPressPhotoItem}>
          {selectedPhotoUrl !== null ? (
            <Image source={{ uri: selectedPhotoUrl }} width={photoSize.photoWidth} height={photoSize.photoHeight} />
          ) : (
            <View
              style={{ backgroundColor: 'lightgray', width: photoSize.photoWidth, height: photoSize.photoHeight }}
            />
          )}
        </Button>
        <View style={styles.datePickerWrap}>
          <Text>날짜</Text>
          <Button onPress={onPressCalender}>
            <Text>
              {selectedDate === null
                ? '날짜를 선택해주세요'
                : `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, 0)}-${String(
                    selectedDate.getDate()
                  ).padStart(2, 0)}`}
            </Text>
          </Button>
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

        <View style={styles.inputWrap}>
          <SingleLineInput value={title} onChangeText={setTitle} placeholder="제목을 입력해주세요" />
          <MultiLineInput value={content} onChangeText={setContent} placeholder="내용을 입력해주세요" />
          <Button onPress={onPressSave}>
            <View style={[styles.saveBtn, { backgroundColor: canSave ? 'black' : 'lightgray' }]}>
              <Text style={styles.saveBtnText}>등록하기</Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDiaryScreen;

const styles = StyleSheet.create({
  datePickerWrap: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputWrap: {
    paddingHorizontal: 24,
    gap: 16,
    marginTop: 10,
  },
  saveBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  saveBtnText: {
    color: 'white',
    fontSize: 16,
  },
});
