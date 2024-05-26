import {
  Dimensions,
  FlatList,
  Pressable,
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
import globalStyles, {color} from '@/global-style';
import {useForm} from 'react-hook-form';
import {useQuery} from '@tanstack/react-query';
import homeService from '../services/home.services';
import {IResponseQuestion} from '../services/home.model';
import {Button, Icon} from '@rneui/themed';
import ModalAction from '@/screen/components/modal-confirm/modal-action';
import Part1Question from '../components/part-1-question';
import Part2Question from '../components/part-2-question';

const {width, height} = Dimensions.get('screen');

type props = StackScreenProps<THomeStackParamList, 'QuestionDetailScreen'>;

const QuestionDetailScreen = ({navigation, route}: props) => {
  const {partId, maxResultCount} = route.params;
  const uid = useId();
  const progressValue = useSharedValue(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [state, setState] = useState({
    previous: 0,
    visibleModal: false,
  });
  const [indexView, setIndexView] = useState(0);
  const flatListRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      answersSubmit: [],
    },
  });

  const renderBackButton = useCallback(
    () => (
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          width: 40,
          aspectRatio: 1,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon type="ionicon" name="arrow-back" color={'black'} size={26} />
      </Pressable>
    ),
    [navigation],
  );

  const onSubmit = (data: any) => {
    console.log(data, 'hehe');
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'left',
      title: 'Câu ' + pageIndex,
      headerLeft: renderBackButton,
      headerStyle: {},
    });
  }, [navigation, pageIndex, progressValue.value, renderBackButton]);

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
    ({item, index}: {item: IResponseQuestion; index: number}) => {
      switch (partId) {
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
              <Part5Question
                question={item}
                setValue={setValue}
                getValues={getValues}
              />
            </View>
          );
        default:
          return <></>;
      }
    },
    [getValues, indexView, partId, setValue, uid],
  );

  const onViewableItemsChanged = (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    console.log(info.viewableItems[0]?.index, 'hhh');
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
                    key={index}
                    length={getQuestionUser?.data?.length}
                    widthMax={width / (maxResultCount ?? 6)}
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
        onEndReachedThreshold={70}
      />

      {state.visibleModal && (
        <ModalAction
          isVisible={state.visibleModal}
          closeModal={() => setState(prev => ({...prev, visibleModal: false}))}
          onSubmit={handleSubmit(onSubmit)}
          content="hehe"
          textCancel="Huỷ bỏ"
          textSubmit="Nộp"
          animationIn="fadeInRight"
          animationOut="fadeInLeft"
          swipeDirection={['left', 'right']}
          disable={false}
        />
      )}
    </SafeAreaView>
  );
};

export default QuestionDetailScreen;

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
  },
});
