import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useId, useMemo, useState} from 'react';
import {IResponseQuestion} from '../services/home.model';
import globalStyles, {color} from '@/global-style';
import ItemAnswer from './item-answer';
import PlaySound from './play-sound';

type TPart2Question = {
  question: IResponseQuestion;
  setValue: any;
  getValues: any;
  indexView?: number;
  notActive?: boolean;
};

const Part2Question = (props: TPart2Question) => {
  const {question, setValue, getValues, indexView, notActive} = props;
  const uid = useId();
  const currentAnswers = getValues('resultOfUser');
  const questionIndex = useMemo(
    () =>
      currentAnswers.findIndex((item: any) => item.idQuestion === question.id),
    [currentAnswers, question.id],
  );

  const [selected, setSelected] = useState({
    index: currentAnswers[questionIndex]?.idAnswers ?? 0,
    backgroundSelect: currentAnswers[questionIndex]?.idAnswers
      ? color.orange_500
      : 'white',
    colorText: currentAnswers[questionIndex]?.idAnswers ? 'white' : 'black',
  });

  const onSubmitOneQuestion = useCallback(
    (idAnswers: number | null) => {
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
      <PlaySound indexView={indexView} question={question} paused={notActive} />
      <View style={styles.boxContent}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>Chọn câu trả lời đúng</Text>
        </View>
        <View style={styles.content}>
          {question?.answers.map((item, index) => (
            <ItemAnswer
              key={index + 'answer-part2' + uid}
              answer={item}
              selected={selected}
              setSelected={setSelected}
              index={index}
              onSubmitOneQuestion={onSubmitOneQuestion}
              listening={true}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Part2Question;

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
});
