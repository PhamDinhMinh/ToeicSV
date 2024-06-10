import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useId, useMemo, useState} from 'react';
import globalStyles, {color} from '@/global-style';
import {IResponseQuestion} from '../services/home.model';
import ItemAnswer from './item-answer';

type TPart5Question = {
  question: IResponseQuestion;
  setValue: any;
  getValues: any;
  indexView?: number;
  notActive?: boolean;
};

const Part5Question = (props: TPart5Question) => {
  const {question, setValue, getValues, notActive} = props;
  const uid = useId();
  const currentAnswers = getValues('resultOfUser');
  const questionIndex = useMemo(
    () =>
      currentAnswers.findIndex((item: any) => item.idQuestion === question.id),
    [currentAnswers, question.id],
  );

  const [selected, setSelected] = useState({
    index: currentAnswers[questionIndex]?.idAnswer ?? 0,
    backgroundSelect: currentAnswers[questionIndex]?.idAnswer
      ? color.orange_500
      : 'white',
    colorText: currentAnswers[questionIndex]?.idAnswer ? 'white' : 'black',
  });

  const onSubmitOneQuestion = useCallback(
    (idAnswer: number | null) => {
      let updatedAnswers;
      if (questionIndex > -1) {
        updatedAnswers = currentAnswers.map((item: any, index: number) =>
          index === questionIndex ? {...item, idAnswer: idAnswer} : item,
        );
      } else {
        updatedAnswers = [
          ...currentAnswers,
          {idQuestion: question.id, idAnswer: idAnswer},
        ];
      }
      setValue('resultOfUser', updatedAnswers);
    },
    [currentAnswers, question.id, questionIndex, setValue],
  );

  useEffect(() => {
    if (questionIndex === -1 && !notActive) {
      onSubmitOneQuestion(null);
    }
  }, [notActive, onSubmitOneQuestion, question.id, questionIndex]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxContent}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>{question?.content}</Text>
        </View>
        <View style={styles.content}>
          {question?.answers.map((item, index) => (
            <ItemAnswer
              key={index + 'answer-part5' + uid}
              answer={item}
              selected={selected}
              setSelected={setSelected}
              index={index}
              onSubmitOneQuestion={onSubmitOneQuestion}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Part5Question;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: 400,
  },
  boxContent: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    maxHeight: 500,
  },
  header: {},
  textTitle: {
    ...globalStyles.text15Regular,
  },
  content: {
    paddingVertical: 10,
  },
});
