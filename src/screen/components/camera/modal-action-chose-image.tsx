import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import Modal from 'react-native-modal';
import {Button} from '@rneui/themed';
import globalStyles, {color} from '@/global-style';
import ImageCropPicker from 'react-native-image-crop-picker';
import {TPickedImage, getImageObjectFromPicker} from '@/utils/images/image';

type TChoseImage = {
  titleModal: string;
  isVisible: boolean;
  closeModal: () => void;
  handleAction: (item: TPickedImage) => void;
};

const ChooseImage = (props: TChoseImage) => {
  const {titleModal, isVisible, closeModal, handleAction} = props;

  const chooseImage = async () => {
    closeModal();
    setTimeout(() => {
      ImageCropPicker.openPicker({
        mediaType: 'photo',
      })
        .then(result => {
          closeModal();
          handleAction(getImageObjectFromPicker(result));
        })
        .catch(error => {
          console.log(error);
        });
    }, 500);
  };

  const takeImage = async () => {
    closeModal();
    setTimeout(() => {
      ImageCropPicker.openCamera({
        mediaType: 'photo',
      })
        .then(result => {
          handleAction(getImageObjectFromPicker(result));
        })
        .catch(error => {
          console.log(error);
        });
    }, 500);
  };

  return (
    <Modal
      onBackdropPress={closeModal}
      backdropOpacity={0.2}
      useNativeDriver={true}
      isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.textTitle}>{titleModal}</Text>
        <View style={styles.buttonGroup}>
          <Button
            onPress={chooseImage}
            buttonStyle={styles.button}
            title={'Chọn ảnh'}
          />
          <Button
            onPress={takeImage}
            buttonStyle={styles.button}
            title={'Chụp ảnh mới'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(ChooseImage);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingVertical: 20,
  },
  textTitle: {
    ...globalStyles.text17Bold,
    color: 'black',
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    backgroundColor: color.green_base_400,
    paddingHorizontal: 20,
  },
});
