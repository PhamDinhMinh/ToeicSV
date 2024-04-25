import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles, {color} from '@/global-style';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import ReactNativeModal from 'react-native-modal';
import {Button} from '@rneui/themed';
import {useTranslation} from 'react-i18next';

type TDateInput = {
  setValue: (item: any) => void;
  value: any;
};

const DateInput = (props: TDateInput) => {
  const {setValue, value} = props;

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <Pressable style={styles.textInput} onPress={toggleVisible}>
        <Text style={styles.text}>
          {value ? moment(value).format('DD/MM/YYYY') : ''}
        </Text>
      </Pressable>
      <ModalSelect
        isVisible={isVisible}
        toggleVisible={toggleVisible}
        initialDate={value}
        setValue={setValue}
      />
    </>
  );
};

type TModalSelect = {
  isVisible: boolean;
  initialDate?: any;
  toggleVisible: () => void;
  setValue: (item: any) => void;
};

const ModalSelect = (props: TModalSelect) => {
  const {isVisible, initialDate, toggleVisible, setValue} = props;
  const [date, setDate] = useState(
    moment(initialDate ? initialDate : undefined).toDate(),
  );
  const language = useTranslation();

  return (
    <ReactNativeModal
      useNativeDriver={Platform.OS === 'android'}
      backdropOpacity={0.2}
      isVisible={isVisible}
      style={styles.modalContainer}>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}>
        <DatePicker
          mode="date"
          date={date}
          onDateChange={setDate}
          maximumDate={moment().toDate()}
        />
        <View style={styles.buttonGroup}>
          <Button
            buttonStyle={styles.button}
            type="outline"
            title={language.t('cancel')}
            titleStyle={{color: 'black'}}
            onPress={toggleVisible}
          />
          <Button
            buttonStyle={[
              styles.button,
              {
                backgroundColor: color.green_300,
              },
            ]}
            onPress={() => {
              setValue(moment(date).toISOString());
              toggleVisible();
            }}
            title={'Xong'}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};
export default DateInput;

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    marginLeft: 40,
    borderBottomColor: '#F1F2F8',
    borderBottomWidth: 1,
  },
  text: {
    ...globalStyles.text16Medium,
    color: 'black',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  button: {
    borderRadius: 10,
  },
});
