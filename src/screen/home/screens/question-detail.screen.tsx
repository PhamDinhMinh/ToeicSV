import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {THomeStackParamList} from '@/routes/home-stack';
import {EPart} from '@/enum/part';
import Part5Question from '../components/part-5-question';
import {useSharedValue} from 'react-native-reanimated';
import {PaginationItem} from '@/screen/documents/exam-tips/exam-tips.detail';
import {color} from '@/global-style';
import {useForm} from 'react-hook-form';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import homeService from '../services/home.services';
import {
  IResponseQuestion,
  IResponseQuestionGroup,
  IResponseSubmit,
  ISubmitQuestionInput,
} from '../services/home.model';
import ModalAction from '@/screen/components/modal-confirm/modal-action';
import Part1Question from '../components/part-1-question';
import Part2Question from '../components/part-2-question';
import Loading from '@/screen/components/loading/loading';
import Part34Question from '../components/part-3-4-question';
import Part67Question from '../components/part-6-7-question';
import RenderBackButton from '../components/render-back-button';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<THomeStackParamList, 'QuestionDetailScreen'>;

const QuestionDetailScreen = ({navigation, route}: props) => {
  const {partId, maxResultCount} = route.params;
  const uid = useId();
  const progressValue = useSharedValue(0);
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState(1);
  const [state, setState] = useState({
    endReach: false,
    visibleModal: false,
  });
  const [indexView, setIndexView] = useState(-100);
  const flatListRef = useRef(null);

  const {
    handleSubmit,
    // formState: {errors},
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      resultOfUser: [],
    },
  });

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
    switch (partId) {
      case EPart.Part1:
      case EPart.Part2:
      case EPart.Part5:
        return 'Câu ' + pageIndex;
      case EPart.Part3:
      case EPart.Part4:
        return 'Câu ' + (pageIndex * 3 - 2) + ' - ' + pageIndex * 3;
      case EPart.Part6:
        return 'Câu ' + (pageIndex * 4 - 3) + ' - ' + pageIndex * 4;
      case EPart.Part7:
        if (indexView < 4) {
          return (
            'Câu ' + Number((pageIndex - 1) * 2 + 1) + ' - ' + pageIndex * 2
          );
        } else if (indexView < 7) {
          return (
            'Câu ' +
            Number(9 + (pageIndex - 5) * 3) +
            ' - ' +
            Number(8 + (pageIndex - 4) * 3)
          );
        } else if (indexView < 10) {
          return (
            'Câu ' +
            Number(18 + (pageIndex - 8) * 4) +
            ' - ' +
            Number(17 + (pageIndex - 7) * 4)
          );
        }
        return (
          'Câu ' +
          Number(30 + (pageIndex - 11) * 5) +
          ' - ' +
          Number(29 + (pageIndex - 10) * 5)
        );

      default:
        return 'Câu ' + pageIndex;
    }
  }, [indexView, pageIndex, partId]);

  const {mutate: submitQuestion, status: statusSubmit} = useMutation({
    mutationFn: (dataSubmit: ISubmitQuestionInput) =>
      homeService.submitQuestion(dataSubmit),
    onSuccess: (data: IResponseSubmit) => {
      queryClient.refetchQueries({queryKey: ['getHistoryForUser']});
      queryClient.refetchQueries({queryKey: ['getRanks']});
      navigation.replace('ResultSubmitScreen', {item: data});
    },
  });

  const onSubmit = (data: any) => {
    submitQuestion(data);
    setState({endReach: false, visibleModal: false});
  };

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

  const {data: getQuestionUser} = useQuery({
    queryKey: ['getQuestionUser', partId, maxResultCount],
    queryFn: () =>
      homeService.getQuestionUser({
        partId: partId,
        skipCount: 0,
        maxResultCount: maxResultCount ?? 6,
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
        switch (partId) {
          case EPart.Part1:
            return (
              <View style={{width: width}} key={index + 'part1' + uid}>
                {(indexView === index ||
                  (indexView < 6 ? indexView + 1 : indexView) === index ||
                  (indexView > 0 ? indexView - 1 : indexView) === index) && (
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
                  (indexView < 30 ? indexView + 1 : indexView) === index ||
                  (indexView > 0 ? indexView - 1 : indexView) === index) && (
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
        switch (partId) {
          case EPart.Part3:
            return (
              <View style={{width: width}} key={index + 'part3' + uid}>
                {(indexView === index ||
                  (indexView < 13 ? indexView + 1 : indexView) === index ||
                  (indexView > 0 ? indexView - 1 : indexView) === index) && (
                  <Part34Question
                    groupQuestion={item}
                    setValue={setValue}
                    getValues={getValues}
                    indexView={indexView}
                    notActive={indexView !== index}
                    indexSTTGroup={index}
                  />
                )}
              </View>
            );
          case EPart.Part4:
            return (
              <View style={{width: width}} key={index + 'part4' + uid}>
                {(indexView === index ||
                  (indexView < 10 ? indexView + 1 : indexView) === index ||
                  (indexView > 0 ? indexView - 1 : indexView) === index) && (
                  <Part34Question
                    groupQuestion={item}
                    setValue={setValue}
                    getValues={getValues}
                    indexView={indexView}
                    notActive={indexView !== index}
                    indexSTTGroup={index}
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
                  />
                )}
              </View>
            );
          default:
            return <></>;
        }
      }
    },
    [getValues, indexView, partId, setValue, uid],
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

  const widthPagination = useCallback(() => {
    switch (partId) {
      case EPart.Part1:
      case EPart.Part2:
      case EPart.Part5:
        return width / (maxResultCount ?? 6);
      case EPart.Part3:
      case EPart.Part4:
        return width / ((maxResultCount && maxResultCount / 3) ?? 6);
      case EPart.Part6:
        return width / ((maxResultCount && maxResultCount / 4) ?? 6);
      case EPart.Part7:
        return width / ((maxResultCount && 15) ?? 6);
      default:
        return width / (maxResultCount ?? 6);
    }
  }, [maxResultCount, partId]);

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
            {getQuestionUser &&
              getQuestionUser?.data?.map((_, index) => {
                return (
                  <PaginationItem
                    backgroundColor={color.green_base_500}
                    animValue={progressValue}
                    index={index}
                    key={index + uid + 'pagination'}
                    length={getQuestionUser?.data?.length}
                    widthMax={widthPagination()}
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
        data={getQuestionUser ? getQuestionUser.data : []}
        pagingEnabled
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
      {statusSubmit === 'pending' && <Loading />}
    </SafeAreaView>
  );
};

export default QuestionDetailScreen;

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
  },
});
