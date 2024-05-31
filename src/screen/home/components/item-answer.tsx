import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {IAnswers} from '../services/home.model';
import globalStyles, {color} from '@/global-style';

type TItemAnswer = {
  answer: IAnswers;
  index: number;
  selected?: any;
  setSelected?: any;
  onSubmitOneQuestion: (idAnswers: number | null) => void;
  listening?: boolean;
};

const ItemAnswer = (props: TItemAnswer) => {
  const {answer, index, onSubmitOneQuestion, selected, setSelected, listening} =
    props;

  const handlePress = () => {
    setSelected({
      index: answer.id,
      backgroundSelect: color.orange_500,
      colorText: 'white',
    });
    onSubmitOneQuestion(answer?.id);
  };

  return (
    <Pressable style={[styles.flexBox, styles.viewAnswers]} key={answer?.id}>
      <Pressable
        style={[
          styles.viewSelect,
          {
            backgroundColor:
              answer.id === selected.index
                ? selected.backgroundSelect
                : 'white',
          },
        ]}
        onPress={handlePress}>
        <Text
          style={{
            color: answer.id === selected.index ? selected.colorText : 'black',
          }}>
          {String.fromCharCode(65 + index)}
        </Text>
      </Pressable>
      <Text style={styles.textContentAnswer}>
        {!listening ? String.fromCharCode(65 + index) : answer?.content}
      </Text>
    </Pressable>
  );
};

export default ItemAnswer;

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAnswers: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  viewSelect: {
    width: 36,
    height: 36,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: color.grey_300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContentAnswer: {
    ...globalStyles.text15Regular,
    paddingHorizontal: 10,
    flex: 1,
  },
});
