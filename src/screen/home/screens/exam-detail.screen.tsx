import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import {THomeStackParamList} from '@/routes/home-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm} from 'react-hook-form';
import {useMutation, useQuery} from '@tanstack/react-query';
import homeService from '../services/home.services';
import {
  IResponseQuestion,
  IResponseQuestionGroup,
  ISubmitQuestionInput,
} from '../services/home.model';
import {useSharedValue} from 'react-native-reanimated';
import {PaginationItem} from '@/screen/documents/exam-tips/exam-tips.detail';
import {color} from '@/global-style';
import {EPart} from '@/enum/part';
import Part1Question from '../components/part-1-question';
import Part2Question from '../components/part-2-question';
import Part5Question from '../components/part-5-question';
import Part34Question from '../components/part-3-4-question';
import Part67Question from '../components/part-6-7-question';
import RenderBackButton from '../components/render-back-button';
import ModalAction from '@/screen/components/modal-confirm/modal-action';
import Loading from '@/screen/components/loading/loading';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<THomeStackParamList, 'ExamDetailScreen'>;

const ExamDetailScreen = ({navigation, route}: props) => {
  const {idExam} = route.params;
  const uid = useId();
  const progressValue = useSharedValue(0);
  const [indexView, setIndexView] = useState(-100);
  const [pageIndex, setPageIndex] = useState(1);
  const flatListRef = useRef(null);
  const [state, setState] = useState({
    endReach: false,
    visibleModal: false,
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      resultOfUser: [],
      timeStart: '',
      timeEnd: '',
      idExam: idExam,
    },
  });

  const {mutate: submitQuestion, status: statusSubmit} = useMutation({
    mutationFn: (dataSubmit: ISubmitQuestionInput) =>
      homeService.submitQuestion(dataSubmit),
    onSuccess: data => {
      console.log(data);
    },
  });

  const onSubmit = (data: any) => {
    submitQuestion(data);
    setState({endReach: false, visibleModal: false});
    navigation.replace('ResultSubmitScreen', {});
  };

  const renderBackButton = useCallback(
    () => (
      <RenderBackButton
        navigation={navigation}
        reset={reset}
        setIndexView={setIndexView}
      />
    ),
    [navigation, reset],
  );

  const titleRender = useCallback(() => {
    if (pageIndex < 32) {
      return 'Câu ' + pageIndex;
    } else if (pageIndex < 55) {
      return (
        'Câu ' + Number(3 * pageIndex - 64) + ' - ' + Number(pageIndex * 3 - 62)
      );
    } else if (pageIndex < 85) {
      return 'Câu ' + Number(pageIndex + 46);
    } else if (pageIndex < 89) {
      return (
        'Câu ' +
        Number(4 * pageIndex - 209) +
        ' - ' +
        Number(pageIndex * 4 - 206)
      );
    }
    if (pageIndex < 93) {
      return (
        'Câu ' + Number(2 * pageIndex - 31) + ' - ' + Number(pageIndex * 2 - 30)
      );
    }
    if (pageIndex < 96) {
      return (
        'Câu ' +
        Number(3 * pageIndex - 124) +
        ' - ' +
        Number(pageIndex * 3 - 122)
      );
    }
    if (pageIndex < 99) {
      return (
        'Câu ' +
        Number(4 * pageIndex - 220) +
        ' - ' +
        Number(pageIndex * 4 - 217)
      );
    }
    return (
      'Câu ' + Number(5 * pageIndex - 319) + ' - ' + Number(pageIndex * 5 - 315)
    );
  }, [pageIndex]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'left',
      title: titleRender(),
      headerLeft: renderBackButton,
      headerStyle: {},
    });
  }, [
    navigation,
    pageIndex,
    progressValue.value,
    renderBackButton,
    titleRender,
  ]);

  const {data: getExamDetail, isLoading} = useQuery({
    queryKey: ['get-exam-detail', idExam],
    queryFn: () =>
      homeService.getExamDetail({
        id: idExam,
      }),
  });

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: IResponseQuestion | IResponseQuestionGroup;
      index: number;
    }) => {
      if ('idGroupQuestion' in item) {
        switch (item?.partId) {
          case EPart.Part1:
            return (
              <View style={{width: width}} key={index + 'part1' + uid}>
                {(indexView === index ||
                  indexView + 1 === index ||
                  indexView - 1 === index) && (
                  <Part1Question
                    question={item}
                    setValue={setValue}
                    getValues={getValues}
                    indexView={indexView}
                    notActive={indexView !== index}
                  />
                )}
              </View>
            );
          case EPart.Part2:
            return (
              <View style={{width: width}} key={index + 'part2' + uid}>
                {(indexView === index ||
                  indexView + 1 === index ||
                  indexView - 1 === index) && (
                  <Part2Question
                    question={item}
                    setValue={setValue}
                    getValues={getValues}
                    indexView={indexView}
                    notActive={indexView !== index}
                  />
                )}
              </View>
            );
          case EPart.Part5:
            return (
              <View style={{width: width}} key={index + 'part5' + uid}>
                {(indexView === index ||
                  indexView + 1 === index ||
                  indexView - 1 === index) && (
                  <Part5Question
                    question={item}
                    setValue={setValue}
                    getValues={getValues}
                  />
                )}
              </View>
            );
          default:
            return <></>;
        }
      } else {
        switch (item?.partId) {
          case EPart.Part3:
            return (
              <View style={{width: width}} key={index + 'part3' + uid}>
                {(indexView === index ||
                  indexView + 1 === index ||
                  indexView - 1 === index) && (
                  <Part34Question
                    groupQuestion={item}
                    setValue={setValue}
                    getValues={getValues}
                    indexView={indexView}
                    notActive={indexView !== index}
                    indexSTTGroup={index}
                    onExam={true}
                  />
                )}
              </View>
            );
          case EPart.Part4:
            return (
              <View style={{width: width}} key={index + 'part4' + uid}>
                {(indexView === index ||
                  indexView + 1 === index ||
                  indexView - 1 === index) && (
                  <Part34Question
                    groupQuestion={item}
                    setValue={setValue}
                    getValues={getValues}
                    indexView={indexView}
                    notActive={indexView !== index}
                    indexSTTGroup={index}
                    onExam={true}
                  />
                )}
              </View>
            );
          case EPart.Part6:
            return (
              <View style={{width: width}} key={index + 'part6' + uid}>
                {(indexView === index ||
                  indexView + 1 === index ||
                  indexView - 1 === index) && (
                  <Part67Question
                    groupQuestion={item}
                    setValue={setValue}
                    getValues={getValues}
                    indexView={indexView}
                    notActive={indexView !== index}
                    indexSTTGroup={index}
                    partId={EPart.Part6}
                    onExam={true}
                  />
                )}
              </View>
            );
          case EPart.Part7:
            return (
              <View style={{width: width}} key={index + 'part7' + uid}>
                {(indexView === index ||
                  indexView + 1 === index ||
                  indexView - 1 === index) && (
                  <Part67Question
                    groupQuestion={item}
                    setValue={setValue}
                    getValues={getValues}
                    indexView={indexView}
                    notActive={indexView !== index}
                    indexSTTGroup={index}
                    partId={EPart.Part7}
                    onExam={true}
                  />
                )}
              </View>
            );
          default:
            return <></>;
        }
      }
    },
    [getValues, indexView, setValue, uid],
  );

  const onViewableItemsChanged = (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    setIndexView(info.viewableItems[0]?.index as number);
    progressValue.value = info.viewableItems[0]?.index as number;
    setPageIndex((info.viewableItems[0]?.index as number) + 1);
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        viewAreaCoveragePercentThreshold: 50,
      },
      onViewableItemsChanged,
    },
  ]);

  const handleEndReached = ({distanceFromEnd}: any) => {
    if (distanceFromEnd >= 0) {
      setState(prev => ({...prev, endReach: true}));
    }
  };

  const handleScroll = useCallback(
    (event: any) => {
      const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
      const isScrolledToEnd =
        layoutMeasurement.width + contentOffset.x > contentSize.width;
      if (state.endReach && isScrolledToEnd) {
        setState(prev => ({...prev, visibleModal: true}));
      }
    },
    [state.endReach],
  );

  return (
    <SafeAreaView>
      {!!progressValue && (
        <View style={styles.pagination}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            {getExamDetail?.data?.questionsOnExam &&
              getExamDetail?.data?.questionsOnExam?.map((_, index) => {
                return (
                  <PaginationItem
                    backgroundColor={color.green_base_500}
                    animValue={progressValue}
                    index={index}
                    key={index + uid + 'pagination'}
                    length={getExamDetail?.data?.questionsOnExam?.length}
                    widthMax={width / 103}
                    fullWidth
                    // {...paginationProps}
                  />
                );
              })}
          </View>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={getExamDetail?.data ? getExamDetail?.data?.questionsOnExam : []}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => {
          return {length: width, offset: width * index, index};
        }}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').width}
        style={{padding: 0, margin: 0}}
        contentContainerStyle={{padding: 0, margin: 0}}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={handleEndReached}
        onScroll={handleScroll}
      />
      {state.visibleModal && (
        <ModalAction
          isVisible={state.visibleModal}
          closeModal={() => setState(prev => ({...prev, visibleModal: false}))}
          onSubmit={handleSubmit(onSubmit)}
          content="Bạn có thể xem kết quả và đáp án, sau khi đã nộp bài."
          textCancel="Huỷ bỏ"
          textSubmit="Nộp"
          animationIn="fadeInRight"
          animationOut="fadeInLeft"
          swipeDirection={['left', 'right']}
          disable={false}
        />
      )}
      {(statusSubmit === 'pending' || isLoading) && <Loading />}
    </SafeAreaView>
  );
};

export default ExamDetailScreen;

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
  },
});
