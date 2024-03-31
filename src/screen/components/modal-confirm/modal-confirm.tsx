import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {Button} from '@rneui/base';
import {useTranslation} from 'react-i18next';
import globalStyles, {color} from '@/global-style';

type TModalConfirm = {
  isVisible: boolean;
  content: string;
  closeModal: () => void;
  handlePress?: any;
  setTokenAuth?: any;
  setAccount?: any;
};

const ModalConfirm = (props: TModalConfirm) => {
  const {
    isVisible,
    closeModal,
    handlePress,
    content,
    setTokenAuth,
    setAccount,
  } = props;

  const language = useTranslation();

  return (
    <ReactNativeModal
      statusBarTranslucent={true}
      backdropOpacity={0.2}
      swipeDirection={['up', 'down']}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={closeModal}
      isVisible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.textContent}>{content}</Text>
        <View style={styles.groupButton}>
          <Button
            title={language.t('cancel')}
            buttonStyle={[styles.buttonCancel, {borderColor: color.grey_400}]}
            onPress={() => closeModal()}
            titleStyle={{color: 'black', fontSize: 15}}
            color="black"
            type="outline"
          />
          <Button
            title={language.t('confirm')}
            buttonStyle={styles.buttonConfirm}
            titleStyle={{fontSize: 15}}
            onPress={() => {
              handlePress();
              setTimeout(() => {
                setTokenAuth && setTokenAuth(null);
                setAccount && setAccount(null);
              }, 500);
              closeModal();
            }}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalConfirm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // height: 100,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 14,
  },
  textContent: {
    ...globalStyles.text16Regular,
  },
  groupButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 14,
  },
  buttonCancel: {
    borderRadius: 8,
    marginRight: 16,
  },
  buttonConfirm: {
    borderRadius: 8,
  },
});
