import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PlaySound from './play-sound';
import ItemAnswer from './item-answer';
import globalStyles, {color} from '@/global-style';
import {IResponseQuestionGroup} from '../services/home.model';

type TPart3Question = {
  question: IResponseQuestionGroup;
  setValue: any;
  getValues: any;
  indexView?: number;
  notActive?: boolean;
};

const Part3Question = (props: TPart3Question) => {
  const {question, setValue, getValues, indexView, notActive} = props;
  const [selected, setSelected] = useState({
    index: 0,
    backgroundSelect: 'white',
    colorText: 'black',
  });
  const currentAnswers = getValues('resultOfUser');

  const onSubmitOneQuestion = (idAnswers: number) => {
    const questionIndex = currentAnswers.findIndex(
      (item: any) => item.idQuestion === question.id,
    );
    let updatedAnswers;
    if (questionIndex > -1) {
      updatedAnswers = currentAnswers.map((item: any, index: number) =>
        index === questionIndex ? {...item, idAnswers: idAnswers} : item,
      );
    } else {
      updatedAnswers = [
        ...currentAnswers,
        {idQuestion: question.id, idAnswers: idAnswers},
      ];
    }
    setValue('resultOfUser', updatedAnswers);
  };

  return (
    <ScrollView style={styles.container}>
      <PlaySound indexView={indexView} question={question} paused={notActive} />
      <View style={styles.boxContent}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>Chọn câu trả lời đúng</Text>
        </View>
        <View style={styles.content}>
          {/* {question?.answers.map((item, index) => (
            <ItemAnswer
              answer={item}
              selected={selected}
              setSelected={setSelected}
              index={index}
              onSubmitOneQuestion={onSubmitOneQuestion}
              listening={true}
            />
          ))} */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Part3Question;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  boxContent: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
  },
  header: {},
  textTitle: {
    ...globalStyles.text15Regular,
    marginBottom: 10,
  },
  content: {
    paddingVertical: 10,
  },
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
