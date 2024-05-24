import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {TDocumentStackParamList} from '@/routes/documents-stack';
import RenderHTML from 'react-native-render-html';
import globalStyles, {color} from '@/global-style';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type props = StackScreenProps<TDocumentStackParamList, 'ExamTipsDetailScreen'>;

const ExamTipsDetailScreen = ({route, navigation}: props) => {
  const {item} = route.params;
  const {width, height} = useWindowDimensions();

  const progressValue = useSharedValue(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: item?.title,
      headerStyle: {},
    });
  }, [item?.title, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        loop={false}
        width={width}
        height={height}
        autoPlay={false}
        data={item?.description}
        scrollAnimationDuration={1000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({index}) => (
          <ScrollView style={styles.scrollView}>
            <RenderHTML
              source={{
                html: item?.description[index],
              }}
              tagsStyles={{body: styles.textContent}}
              contentWidth={width}
            />
          </ScrollView>
        )}
      />
      {!!progressValue && item?.description?.length > 1 && (
        <View style={styles.pagination}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {item?.description.map((_, index) => {
              return (
                <PaginationItem
                  containerStyle={{top: -5}}
                  backgroundColor={color.green_base_500}
                  animValue={progressValue}
                  index={index}
                  key={index}
                  length={item?.description.length}
                  // {...paginationProps}
                />
              );
            })}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ExamTipsDetailScreen;

export const PaginationItem = (props: any) => {
  const {
    animValue,
    index,
    length,
    backgroundColor,
    containerStyle,
    widthMax,
    fullWidth,
  } = props;
  const w = widthMax ?? 100 / length;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = fullWidth
      ? [0, w * (index + 1), w * (index + 2)]
      : [-w, 0, w];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = fullWidth ? [0, w, w * 2] : [-w, 0, w];
    }

    if (fullWidth) {
      return {
        transform: [
          {
            translateX: 0,
          },
        ],
        width: interpolate(
          animValue?.value,
          inputRange,
          outputRange,
          Extrapolate.CLAMP,
        ),
      };
    }
    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View
      style={[
        {
          backgroundColor: color.grey_400,
          width: w,
          height: 3,
          overflow: 'hidden',
          transform: [
            {
              rotateZ: '0deg',
            },
          ],
          borderTopRightRadius: index !== length - 1 ? 0 : 50,
          borderBottomRightRadius: index !== length - 1 ? 0 : 50,
          borderTopLeftRadius: index !== 0 ? 0 : 50,
          borderBottomLeftRadius: index !== 0 ? 0 : 50,
        },
        containerStyle,
      ]}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  textContent: {
    ...globalStyles.text16Regular,
    color: 'black',
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
