import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {Button} from '@rneui/base';
import globalStyles, {color} from '@/global-style';
import {Animation, CustomAnimation} from 'react-native-animatable';

export type Direction = 'up' | 'down' | 'left' | 'right';

type TModalConfirm = {
  isVisible: boolean;
  closeModal: () => void;
  content: string;
  textCancel?: string;
  textSubmit: string;
  onSubmit: any;
  animationIn: Animation | CustomAnimation;
  animationOut: Animation | CustomAnimation;
  swipeDirection: Direction | Array<Direction>;
  disable?: boolean;
};

const ModalAction = (props: TModalConfirm) => {
  const {
    isVisible,
    closeModal,
    content,
    disable,
    onSubmit,
    textSubmit,
    textCancel,
    animationIn,
    animationOut,
    swipeDirection,
  } = props;

  return (
    <ReactNativeModal
      statusBarTranslucent={true}
      backdropOpacity={0.2}
      swipeDirection={swipeDirection}
      animationIn={animationIn}
      animationOut={animationOut}
      onBackdropPress={closeModal}
      isVisible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.textContent}>{content}</Text>
        <View style={styles.groupButton}>
          <Button
            title={textSubmit}
            buttonStyle={styles.buttonConfirm}
            titleStyle={{fontSize: 15}}
            onPress={() => onSubmit()}
            disabled={disable}
          />
          <Button
            title={textCancel ?? 'Huỷ'}
            buttonStyle={[styles.buttonCancel, {borderColor: color.grey_400}]}
            onPress={() => closeModal()}
            titleStyle={{color: 'black', fontSize: 15}}
            color="black"
            type="outline"
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalAction;

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
    backgroundColor: color.green_base_400,
  },
});
