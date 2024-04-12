import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import listEmoji from './list-emoji';
import {MotiView} from 'moti';
import ItemEmoji from './item-emoji';

type TModalPopUpEmoji = {
  handleModalClose: () => void;
  visibleEmoji: boolean;
  handleChooseIcon: (index: number) => void;
  currentEmoji?: number | null;
  modalPositionTop: number;
  modalPositionLeft: number;
  marginBottom: number;
};
const ModalPopUpEmoji = (props: TModalPopUpEmoji) => {
  const {
    handleModalClose,
    visibleEmoji,
    handleChooseIcon,
    currentEmoji,
    modalPositionTop,
    modalPositionLeft,
    marginBottom,
  } = props;
  const handleChoose = (index: number) => {
    handleChooseIcon(index);
  };

  return (
    <Modal
      isVisible={visibleEmoji}
      onBackdropPress={handleModalClose}
      backdropColor="transparent">
      <MotiView
        style={[
          styles.contentEmoji,
          {
            top: modalPositionTop,
            left: modalPositionLeft,
            marginBottom: marginBottom,
          },
        ]}
        from={{opacity: 0}}
        animate={{opacity: 1}}>
        <MotiView
          style={styles.floatBox}
          from={{translateY: 40, opacity: 0}}
          animate={{translateY: 0, opacity: 0.9}}
          exit={{translateY: 40, opacity: 0}}
          transition={{duration: 1000}}>
          <View style={styles.emojiBox}>
            {listEmoji.map((itemEmoji, index) => {
              return (
                <ItemEmoji
                  onPress={() => handleChoose(index)}
                  Data={itemEmoji.emoji}
                  index={index}
                  scaled={index === currentEmoji}
                  des={itemEmoji.des}
                  key={index}
                />
              );
            })}
          </View>
        </MotiView>
      </MotiView>
    </Modal>
  );
};

export default ModalPopUpEmoji;

const styles = StyleSheet.create({
  contentEmoji: {
    height: 80,
    backgroundColor: 'transparent',
    left: '3%',
    alignItems: 'center',
    zIndex: 10,
    width: '94%',
  },
  floatBox: {
    backgroundColor: '#FFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    borderRadius: 40,
    paddingHorizontal: '2%',
    height: 50,
    alignItems: 'center',
    width: '100%',
  },
  emojiBox: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
