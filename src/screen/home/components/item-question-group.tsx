import {Text, View} from 'react-native';
import React, {useCallback, useEffect, useId, useMemo, useState} from 'react';
import {color} from '@/global-style';
import ItemAnswer from './item-answer';
import {EPart} from '@/enum/part';

type TItemQuestionGroup = {
  indexQ: number;
  question: any;
  indexSTTGroup?: number;
  getValues: any;
  setValue: any;
  notActive?: boolean;
  part?: number;
  indexView?: number;
};

const ItemQuestionGroup = (props: TItemQuestionGroup) => {
  const {
    indexQ,
    question,
    indexSTTGroup,
    setValue,
    getValues,
    notActive,
    part,
    indexView,
  } = props;
  const uid = useId();
  const currentAnswers = getValues('resultOfUser');
  const indexViewItem = indexView ?? 0;
  const questionIndex = useMemo(
    () =>
      currentAnswers.findIndex((item: any) => item.idQuestion === question.id),
    [currentAnswers, question.id],
  );

  const numberPart7 = () => {
    if (indexViewItem < 4) {
      return indexQ + 1 + indexViewItem * 2;
    } else if (indexViewItem < 7) {
      return Number(indexQ + (indexViewItem - 4) * 3 + 9);
    } else if (indexViewItem < 10) {
      return Number(indexQ + (indexViewItem - 7) * 4 + 18);
    }
    return Number(indexQ + (indexViewItem - 10) * 5 + 30);
  };

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
      const currentAnswers2 = getValues('resultOfUser');

      if (questionIndex > -1) {
        updatedAnswers = currentAnswers2.map((item: any, indexC: number) =>
          indexC === questionIndex ? {...item, idAnswers: idAnswers} : item,
        );
      } else {
        updatedAnswers = [
          ...currentAnswers2,
          {idQuestion: question.id, idAnswers: idAnswers},
        ];
      }
      setValue('resultOfUser', updatedAnswers);
    },
    [getValues, question.id, questionIndex, setValue],
  );

  useEffect(() => {
    if (questionIndex === -1 && !notActive) {
      onSubmitOneQuestion(null);
    }
  }, [notActive, onSubmitOneQuestion, question.id, questionIndex]);

  return (
    <View style={{marginBottom: 14}}>
      <Text>
        Câu{' '}
        {part === EPart.Part7
          ? numberPart7()
          : (indexSTTGroup ?? 0) * (part === EPart.Part6 ? 4 : 3) +
            (indexQ + 1)}
        : {question?.content}
      </Text>
      {question?.answers.map((item: any, index: number) => (
        <ItemAnswer
          key={index + 'answer' + uid}
          answer={item}
          selected={selected}
          setSelected={setSelected}
          index={index}
          onSubmitOneQuestion={onSubmitOneQuestion}
          listening={true}
          part={EPart.Part3}
        />
      ))}
    </View>
  );
};

export default ItemQuestionGroup;
