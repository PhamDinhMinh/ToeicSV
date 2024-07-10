import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useId, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {THomeStackParamList} from '@/routes/home-stack';
import {useQuery} from '@tanstack/react-query';
import homeService from '../services/home.services';
import PlaySound from '../components/play-sound';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';
import {Divider} from '@rneui/base';
import {SafeAreaView} from 'react-native';
import globalStyles, {color} from '@/global-style';
import {Icon} from '@rneui/themed';
import {IAnswers} from '../services/home.model';
import {EPart} from '@/enum/part';
import {
  TypePart1,
  TypePart2,
  TypePart3,
  TypePart4,
  TypePart5,
  TypePart6,
  TypePart7,
} from '../services/type.model';

const {width, height} = Dimensions.get('screen');

type props = StackScreenProps<
  THomeStackParamList,
  'QuestionResultDetailScreen'
>;

const QuestionResultDetailScreen = ({route}: props) => {
  const {idQuestion, isBoolean, idAnswers} = route.params;
  const uid = useId();

  const [state, setState] = useState({
    transcriptionGroup: false,
    transcriptionQuestion: false,
  });

  const {data: getQuestionById} = useQuery({
    queryKey: ['getQuestionById', idQuestion],
    queryFn: () =>
      homeService.getQuestionById({
        id: idQuestion,
      }),
    enabled: !!idQuestion,
  });

  const typeTagTitle = useCallback(
    (i: number) => {
      switch (getQuestionById?.partId) {
        case EPart.Part1:
          return TypePart1?.find(p => p.value === i)?.label;
        case EPart.Part2:
          return TypePart2?.find(p => p.value === i)?.label;
        case EPart.Part3:
          return TypePart3?.find(p => p.value === i)?.label;
        case EPart.Part4:
          return TypePart4?.find(p => p.value === i)?.label;
        case EPart.Part5:
          return TypePart5?.find(p => p.value === i)?.label;
        case EPart.Part6:
          return TypePart6?.find(p => p.value === i)?.label;
        case EPart.Part7:
          return TypePart7?.find(p => p.value === i)?.label;
        default:
          'Không có';
      }
    },
    [getQuestionById?.partId],
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {getQuestionById?.groupData?.audioUrl && (
          <PlaySound
            question={{
              id: getQuestionById?.groupData?.id,
              audioUrl: getQuestionById?.groupData?.audioUrl,
            }}
          />
        )}
        {getQuestionById?.audioUrl && (
          <PlaySound
            question={{
              id: getQuestionById?.id,
              audioUrl: getQuestionById?.audioUrl,
            }}
          />
        )}
        <View style={styles.content}>
          {getQuestionById?.groupData?.imageUrl[0] && (
            <FastImage
              source={{uri: getQuestionById?.groupData?.imageUrl[0]}}
              style={{
                borderRadius: 5,
                width: '100%',
                height: 200,
                marginBottom: 10,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          {(getQuestionById?.imageUrl?.length ?? 0) > 0 && (
            <FastImage
              source={{uri: getQuestionById?.imageUrl[0]}}
              style={{
                borderRadius: 5,
                width: '100%',
                height: 200,
                marginBottom: 10,
                marginTop: 10,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          {getQuestionById?.groupData?.content && (
            <>
              <ScrollView
                style={styles.viewScrollContent}
                pinchGestureEnabled={true}
                persistentScrollbar={true}>
                <RenderHTML
                  source={{
                    html: getQuestionById?.groupData?.content ?? '',
                  }}
                  contentWidth={width}
                />
              </ScrollView>
              <Divider />
            </>
          )}

          {getQuestionById?.groupData?.transcription && (
            <ScrollView
              style={{marginTop: 10}}
              pinchGestureEnabled={true}
              persistentScrollbar={true}>
              <>
                <Pressable
                  onPress={() =>
                    setState(prev => ({
                      ...prev,
                      transcriptionGroup: !prev.transcriptionGroup,
                    }))
                  }
                  style={styles.viewIcon}>
                  <Text style={styles.textTranscription}>Dịch đoạn trên</Text>
                  <Icon
                    size={20}
                    name={
                      state.transcriptionGroup
                        ? 'caret-up-outline'
                        : 'caret-down-outline'
                    }
                    type="ionicon"
                    color={color.green_base_200}
                  />
                </Pressable>
                {state.transcriptionGroup && (
                  <RenderHTML
                    source={{
                      html: getQuestionById?.groupData?.transcription ?? '',
                    }}
                    contentWidth={width}
                  />
                )}
              </>
            </ScrollView>
          )}

          <Text style={styles.textQuestion}>
            <Text style={{fontWeight: '600'}}>Câu hỏi: </Text>
            {getQuestionById?.content}
          </Text>

          {getQuestionById?.answers &&
            getQuestionById?.answers?.map((answer, index: number) => (
              <Answer
                index={index}
                key={index + uid + 'answer'}
                answer={answer}
                idCorrect={idAnswers}
                isBoolean={isBoolean}
              />
            ))}
          <View style={styles.chipView}>
            <Text>Loại câu: </Text>
            {getQuestionById?.type &&
              getQuestionById?.type?.map((type, index) => (
                <View style={styles.viewItemChip} key={index + 'chip' + uid}>
                  <Text style={styles.chipItem}>{typeTagTitle(type)}</Text>
                </View>
              ))}
          </View>
          {getQuestionById?.transcription && (
            <ScrollView
              style={{marginVertical: 10}}
              pinchGestureEnabled={true}
              persistentScrollbar={true}>
              <>
                <Pressable
                  onPress={() =>
                    setState(prev => ({
                      ...prev,
                      transcriptionQuestion: !prev.transcriptionQuestion,
                    }))
                  }
                  style={styles.viewIcon}>
                  <Text style={styles.textTranscription}>Giải thích: </Text>
                  <Icon
                    size={20}
                    name={
                      state.transcriptionQuestion
                        ? 'caret-up-outline'
                        : 'caret-down-outline'
                    }
                    type="ionicon"
                    color={color.green_base_200}
                  />
                </Pressable>
                {state.transcriptionQuestion && (
                  <RenderHTML
                    source={{
                      html: getQuestionById?.transcription ?? '',
                    }}
                    contentWidth={width}
                  />
                )}
              </>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Answer = ({
  index,
  answer,
  idCorrect,
  isBoolean,
}: {
  index: number;
  answer: IAnswers;
  idCorrect: number | undefined;
  isBoolean: boolean | undefined;
}) => {
  return (
    <View style={[styles.flexBox, styles.viewAnswers]}>
      <View
        style={[
          styles.viewSelect,
          {
            backgroundColor:
              answer.id === idCorrect
                ? isBoolean
                  ? color.green_base_500
                  : color.red_300
                : answer?.isBoolean
                  ? color.green_base_500
                  : 'white',
          },
        ]}>
        <Text
          style={{
            color:
              answer.id === idCorrect || answer?.isBoolean ? 'white' : 'black',
          }}>
          {String.fromCharCode(65 + index)}
        </Text>
      </View>
      <Text>{answer?.content}</Text>
    </View>
  );
};

export default QuestionResultDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 15,
  },
  content: {
    marginHorizontal: 10,
  },
  viewScrollContent: {
    maxHeight: 0.3 * height,
  },
  textTranscription: {
    marginRight: 5,
  },
  viewIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textQuestion: {
    ...globalStyles.text15Regular,
    marginVertical: 10,
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
    marginRight: 5,
  },
  chipView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  viewItemChip: {
    backgroundColor: color.grey_300,
    padding: 4,
    marginHorizontal: 3,
    borderRadius: 8,
    marginVertical: 5,
  },
  chipItem: {
    color: '#a0a0a0',
  },
});
