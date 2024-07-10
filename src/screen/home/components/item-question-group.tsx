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
  onExam?: boolean;
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
    onExam,
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

  const numberOnExam = useCallback(() => {
    if ((part ?? 0) < 5) {
      return ((indexSTTGroup ?? 0) - 31) * 3 + 32 + indexQ;
    } else if ((part ?? 0) < 7) {
      return 4 * (indexSTTGroup ?? 0) - 205 + indexQ;
    }
    if ((indexSTTGroup ?? 0) < 93) {
      return Number(2 * (indexSTTGroup ?? 0) - 29) + indexQ;
    }
    if ((indexSTTGroup ?? 0) < 96) {
      return Number(3 * (indexSTTGroup ?? 0) - 121 + indexQ);
    }
    if ((indexSTTGroup ?? 0) < 99) {
      return Number(4 * (indexSTTGroup ?? 0) - 216 + indexQ);
    }
    return Number(5 * (indexSTTGroup ?? 0) - 314 + indexQ);
  }, [indexQ, indexSTTGroup, part]);

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
      const currentAnswers2 = getValues('resultOfUser');
      const indexOnCurrent =
        currentAnswers2.findIndex(
          (item: any) => item.idQuestion === question.id,
        ) ?? -1;
      if (indexOnCurrent > -1) {
        updatedAnswers = currentAnswers2.map((item: any, indexC: number) =>
          indexC === indexOnCurrent ? {...item, idAnswer: idAnswer} : item,
        );
      } else {
        updatedAnswers = [
          ...currentAnswers2,
          {idQuestion: question.id, idAnswer: idAnswer},
        ];
      }
      setValue('resultOfUser', updatedAnswers);
    },
    [getValues, question.id, setValue],
  );

  useEffect(() => {
    if (questionIndex === -1 && !notActive) {
      onSubmitOneQuestion(null);
    }
  }, [notActive, onSubmitOneQuestion, question.id, questionIndex]);

  return (
    <View style={{marginBottom: 14}}>
      <Text>
        Câu {question.id} hih
        {onExam
          ? numberOnExam()
          : part === EPart.Part7
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
