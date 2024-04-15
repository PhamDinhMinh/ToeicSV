import {View, Text, StyleSheet} from 'react-native';
import React, {memo, useState} from 'react';
import {useInterval} from 'react-use';
import Modal from 'react-native-modal';
import globalStyles, {color} from '@/global-style';
import {useTranslation} from 'react-i18next';
import {Button} from '@rneui/themed';

type TActionDeleteModal = {
  content: string;
  handle: any;
  modalConfirm: boolean;
  setModalConfirm: (modalConfirm: boolean) => void;
  isPending?: boolean;
};

const ActionDeleteModal = (props: TActionDeleteModal) => {
  const {content, handle, modalConfirm, setModalConfirm, isPending} = props;
  const language = useTranslation();
  const [countDown, setCountDown] = useState(10);

  useInterval(
    () => {
      if (modalConfirm) {
        if (countDown > 0) {
          setCountDown(prev => prev - 1);
        } else {
          setModalConfirm(false);
          setCountDown(10);
        }
      } else {
        setCountDown(10);
      }
    },
    modalConfirm ? 1000 : null,
  );

  return (
    <Modal
      isVisible={modalConfirm}
      onBackdropPress={() => {
        setModalConfirm(false);
        setCountDown(10);
      }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={['up', 'down']}
      backdropColor="#000"
      backdropOpacity={0.25}
      style={{alignItems: 'center'}}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#FFF',
          padding: 25,
          borderRadius: 8,
        }}>
        <Text style={styles.titleContent}>{content}</Text>
        <Text style={styles.titleClose}>
          {language.t('auto-close')}{' '}
          <Text style={{fontWeight: '600'}}>{countDown}s</Text>
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            onPress={() => {
              setModalConfirm(false);
              setCountDown(10);
            }}
            containerStyle={styles.containerStyle}
            type="outline"
            titleStyle={[styles.titleStyle, {color: color.grey_600}]}>
            {language.t('cancel')}
          </Button>
          <Button
            disabled={isPending}
            onPress={() => {
              handle();
              setModalConfirm(false);
              setCountDown(10);
            }}
            containerStyle={styles.containerStyle}
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}>
            {language.t('confirm')}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ActionDeleteModal);

const styles = StyleSheet.create({
  titleContent: {
    ...globalStyles.text18Medium,
    marginBottom: 10,
  },
  titleClose: {
    ...globalStyles.text14Regular,
  },
  containerStyle: {
    marginTop: 20,
    marginLeft: 20,
  },
  titleStyle: {
    ...globalStyles.text16Bold,
  },
  buttonStyle: {
    backgroundColor: color.red_400,
  },
  buttonDelete: {
    color: 'white',
  },
});
