import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '@/global-style';
import {useTranslation} from 'react-i18next';
import ReactNativeModal from 'react-native-modal';

type TSelectInput = {
  setValue: (item: any) => void;
  value: any;
  options?: any[];
};

const SelectionInput = (props: TSelectInput) => {
  const {setValue, value, options} = props;

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  const language = useTranslation();

  return (
    <View>
      <>
        <Pressable onPress={toggleVisible} style={styles.inputContainer}>
          <TextInput value={value} />
        </Pressable>

        <ReactNativeModal
          backdropOpacity={0.2}
          onBackdropPress={toggleVisible}
          useNativeDriver={Platform.OS === 'android'}
          isVisible={isVisible}
          style={styles.modal}>
          <View style={styles.modalContent}>
            {options &&
              options.map(item => (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    setValue(item.value);
                    toggleVisible();
                  }}
                  style={[
                    styles.item,
                    {
                      backgroundColor:
                        value === item.value ? '#F1F2F8' : 'white',
                    },
                  ]}>
                  <Text style={styles.text}>{language.t(item.label)}</Text>
                </Pressable>
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
    marginLeft: 40,
    borderBottomColor: '#F1F2F8',
    borderBottomWidth: 1,
  },
  text: {
    ...globalStyles.text16Medium,
    color: 'black',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  modal: {alignItems: 'center', justifyContent: 'center'},
});
