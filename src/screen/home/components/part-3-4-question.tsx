import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useId, useState} from 'react';
import PlaySound from './play-sound';
import globalStyles from '@/global-style';
import {IResponseQuestionGroup} from '../services/home.model';
import FastImage from 'react-native-fast-image';
import {getCachedNetworkImageSize} from '@/utils/images/image';
import ItemQuestionGroup from './item-question-group';

type TPart34Question = {
  groupQuestion: IResponseQuestionGroup;
  setValue: any;
  getValues: any;
  indexView?: number;
  notActive?: boolean;
  indexSTTGroup?: number;
  onExam?: boolean;
};

const Part34Question = (props: TPart34Question) => {
  const {
    groupQuestion,
    setValue,
    getValues,
    indexView,
    notActive,
    indexSTTGroup,
    onExam,
  } = props;
  const uid = useId();
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (groupQuestion?.imageUrl?.[0]) {
      getCachedNetworkImageSize({
        imageUrl: groupQuestion.imageUrl[0],
        onSuccess: result => {
          setAspectRatio(result.width / result.height);
        },
      });
    }
  }, [groupQuestion?.imageUrl]);

  return (
    <ScrollView style={styles.container}>
      <PlaySound
        indexView={indexView}
        question={groupQuestion}
        paused={notActive}
      />
      <View style={styles.boxContent}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>Chọn câu trả lời đúng</Text>
          {groupQuestion?.imageUrl?.[0] && (
            <FastImage
              source={{uri: groupQuestion?.imageUrl[0]}}
              style={{
                borderRadius: 5,
                width: '100%',
                aspectRatio: aspectRatio,
                marginBottom: 10,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
        <View style={styles.content}>
          {groupQuestion?.questions?.map((question, index) => (
            <ItemQuestionGroup
              indexQ={index}
              question={question}
              indexSTTGroup={indexSTTGroup}
              key={index + 'question' + uid}
              getValues={getValues}
              setValue={setValue}
              notActive={notActive}
              onExam={onExam}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Part34Question;

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
