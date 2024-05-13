import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useId, useState} from 'react';
import globalStyles, {color} from '@/global-style';
import ReactNativeModal from 'react-native-modal';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const ItemSelect = ({
  item,
  setValue,
  value,
  toggleVisible,
}: {
  item: any;
  setValue: (item: any) => void;
  value: any;
  toggleVisible: any;
}) => {
  const language = useTranslation();
  const [backgroundItem, setBackgroundItem] = useState('white');

  const handlePressIn = useCallback(() => {
    setBackgroundItem('#E0E0E0');
  }, []);

  const handlePressOut = useCallback(() => {
    setBackgroundItem('white');
  }, []);

  const handlePress = useCallback(() => {
    setValue(item.value);
    toggleVisible();
  }, [item.value, setValue, toggleVisible]);

  return (
    <Pressable
      key={item.value}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.item,
        {
          backgroundColor: value === item.value ? '#F1F2F8' : backgroundItem,
        },
      ]}>
      <Text style={styles.text}>{language.t(item.label)}</Text>
    </Pressable>
  );
};

type TSelectInput = {
  setValue: (item: any) => void;
  value: any;
  options?: any[];
};

const SelectionInput = (props: TSelectInput) => {
  const {setValue, value, options} = props;
  const uid = useId();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  const language = useTranslation();

  return (
    <View style={styles.inputContainer}>
      <>
        <Pressable onPress={toggleVisible}>
          <Text style={styles.textValue}>{value}</Text>
        </Pressable>

        <ReactNativeModal
          backdropOpacity={0.2}
          onBackdropPress={toggleVisible}
          useNativeDriver={Platform.OS === 'android'}
          isVisible={isVisible}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.textLabel}>{language.t('gender')}</Text>
            {options &&
              options.map((item, index) => (
                <ItemSelect
                  value={value}
                  toggleVisible={toggleVisible}
                  setValue={setValue}
                  item={item}
                  key={uid + index}
                />
              ))}
          </View>
        </ReactNativeModal>
      </>
    </View>
  );
};

export default SelectionInput;

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    borderColor: color.green_base_300,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
  },
  textValue: {
    ...globalStyles.text16Regular,
  },
  text: {
    ...globalStyles.text16Medium,
    color: 'black',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: width - 50,
  },
  textLabel: {
    ...globalStyles.text18Medium,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  modal: {alignItems: 'center', justifyContent: 'center'},
});
