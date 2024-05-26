import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '@/global-style';
import {IResponseQuestion} from '../services/home.model';
import ItemAnswer from './item-answer';

type TPart5Question = {
  question: IResponseQuestion;
  setValue: any;
  getValues: any;
};

const Part5Question = (props: TPart5Question) => {
  const {question, setValue, getValues} = props;
  const currentAnswers = getValues('answersSubmit');
  const [selected, setSelected] = useState({
    index: 0,
    backgroundSelect: 'white',
    colorText: 'black',
  });

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
    setValue('answersSubmit', updatedAnswers);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxContent}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>{question?.content}</Text>
        </View>
        <View style={styles.content}>
          {question?.answers.map((item, index) => (
            <ItemAnswer
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
