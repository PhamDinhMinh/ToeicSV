import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useId, useState} from 'react';
import {IResponseQuestionGroup} from '../services/home.model';
import FastImage from 'react-native-fast-image';
import ItemQuestionGroup from './item-question-group';
import globalStyles from '@/global-style';
import {getCachedNetworkImageSize} from '@/utils/images/image';
import RenderHTML from 'react-native-render-html';
import {Divider} from '@rneui/base';

const {width} = Dimensions.get('screen');

type TPart67Question = {
  groupQuestion: IResponseQuestionGroup;
  setValue: any;
  getValues: any;
  indexView?: number;
  notActive?: boolean;
  indexSTTGroup?: number;
  partId?: number;
  onExam?: boolean;
};

const Part67Question = (props: TPart67Question) => {
  const {
    groupQuestion,
    setValue,
    getValues,
    notActive,
    indexSTTGroup,
    indexView,
    partId,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.boxContent}>
        <ScrollView style={styles.header}>
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
          <RenderHTML
            source={{
              html: groupQuestion.content ?? '',
            }}
            contentWidth={width}
          />
        </ScrollView>
        <Divider />
        <Text style={{marginTop: 10, ...globalStyles.text14Medium}}>
          Câu trả lời
        </Text>
        <ScrollView style={styles.content}>
          {groupQuestion?.questions?.map((question, index) => (
            <ItemQuestionGroup
              indexQ={index}
              question={question}
              indexSTTGroup={indexSTTGroup}
              key={index + 'question' + uid}
              getValues={getValues}
              setValue={setValue}
              notActive={notActive}
              part={partId}
              indexView={indexView ?? 0}
              onExam={onExam}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Part67Question;

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
  header: {
    maxHeight: width,
    overflow: 'scroll',
    marginBottom: 14,
  },
  textTitle: {
    ...globalStyles.text15Regular,
    marginBottom: 10,
  },
  content: {
    paddingVertical: 10,
  },
});
