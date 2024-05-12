import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useId} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {useSharedValue} from 'react-native-reanimated';
import {PaginationItem} from '@/screen/documents/exam-tips/exam-tips.detail';
import globalStyles, {color} from '@/global-style';
import {useTranslation} from 'react-i18next';
import ItemPart from '../components/item-part';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';
import {TMainStackParamList} from '@/routes/main-stack';
import {TMyTabsParamsList} from '@/routes/my-tabs';

const {width} = Dimensions.get('screen');

export type IItemPart = {
  content: string;
  value: number;
  description?: string;
  transcription?: string;
};

type props = CompositeScreenProps<
  BottomTabScreenProps<TMyTabsParamsList, 'Home'>,
  StackScreenProps<TMainStackParamList, 'MyTab'>
>;

const HomeScreen = ({navigation}: props) => {
  const uid = useId();
  const progressValue = useSharedValue(0);
  const language = useTranslation();

  const imageBanners = [
    'https://images.ctfassets.net/unrdeg6se4ke/5WkAb12Zu1xXj2L1OwQ9eU/86c22cd763a0b4a8d1ba7a97a211f44a/toeic-danh-gia-trinh-do-giao-tiep-tieng-anh-trong-moi-truong-quoc-te.jpg?&fm=avif&w=1220&h=630',
    'https://bizweb.dktcdn.net/100/242/347/files/anh-the-thi-toeic-1-jpeg.jpg?v=1686276810389',
    'https://maythongdich.com/upload/app-luyen-thi-toeic/Ung-dung-Toeic-Mastery.jpg',
    'https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/210160387_2334647943339185_7305603079375741705_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG9lPIpT4ZbDNTjfxxctj-t_jIyzq3FN4L-MjLOrcU3guXulGhWHFMb9Ifl9xD42HHt8CbwKMYnJRWxIkfIzdzB&_nc_ohc=uHrH7vgKa9UQ7kNvgEcgEU-&_nc_ht=scontent-hkg1-2.xx&oh=00_AYDmho-xPQPuMGt7EzNjNnwkSxj3AGhUMeNgC3e7Bo4hqg&oe=66469487',
  ];

  const listeningPart = [
    {
      content: 'Mô tả ảnh',
      value: 1,
      description:
        'For each question, you will see a picture and you will hear four short statements. The statements will be spoken just one time.' +
        ' They will not be printed in your test book so you must listen carefully to understand what the speaker says. When you hear the tour statements,' +
        'look at the picture and choose the statement that best describes what you see in the picture. Choose the best answer A, B, C, D',
      transcription:
        'Với mỗi câu hỏi, bạn sẽ được xem 1 bức tranh và nghe 4 câu mô tả ngắn. Mỗi câu sẽ chỉ được nói 1 lần. Chúng sẽ không được in trên đề ' +
        'thi nên bạn cần nghe thật cẩn thận để hiểu những điều người nói. Khi bạn nghe 4 câu mô tả, hãy nhìn vào bức tranh và chọn câu mô tả đúng nhất những gì bạn thấy ở trong ' +
        'bức tranh. Chọn đáp án đúng nhất A, B, C, D',
    },
    {
      content: 'Hỏi & đáp',
      value: 2,
    },
    {
      content: 'Đoạn hội thoại',
      value: 3,
    },
    {
      content: 'Đoạn nói chuyện ngắn',
      value: 4,
    },
  ];

  const readingPart = [
    {
      content: 'Điền vào câu',
      value: 5,
    },
    {
      content: 'Điền vào đoạn',
      value: 6,
    },
    {
      content: 'Đọc hiểu đoạn văn',
      value: 7,
    },
  ];

  const goToTrainingDetail = useCallback(
    (item: IItemPart) => {
      navigation.navigate('HomeStack', {
        screen: 'PartDetailScreen',
        params: {
          item: item,
        },
      });
    },
    [navigation],
  );

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Carousel
          loop={true}
          width={width}
          height={(width * 2) / 5}
          autoPlay={true}
          autoPlayInterval={4000}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          data={imageBanners}
          renderItem={({item, index}: {item: string; index: number}) => (
            <FastImage
              key={index + uid + 'banner'}
              style={styles.imageBanner}
              source={{uri: item}}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        />
        {!!progressValue && (
          <View style={styles.pagination}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {imageBanners.map((_, index) => {
                return (
                  <PaginationItem
                    backgroundColor={color.green_500}
                    animValue={progressValue}
                    index={index}
                    key={index}
                    length={imageBanners.length}
                    // {...paginationProps}
                  />
                );
              })}
            </View>
          </View>
        )}
      </SafeAreaView>
      <View style={styles.viewContent}>
        <Text style={styles.textTitle}>{language.t('listening')}</Text>
        <View style={styles.flexBox}>
          {listeningPart.map((item, index) => (
            <Pressable
              style={styles.itemFlex}
              key={index + uid + 'listening'}
              onPress={() => goToTrainingDetail(item)}>
              <ItemPart value={item.value} title={item.content} />
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.viewContent}>
        <Text style={styles.textTitle}>{language.t('reading')}</Text>
        <View style={styles.flexBox}>
          {readingPart.map((item, index) => (
            <Pressable
              style={styles.itemFlex}
              key={index + uid + 'reading'}
              onPress={() => goToTrainingDetail(item)}>
              <ItemPart value={item.value} title={item.content} />
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.viewContent}>
        <Text style={styles.textTitle}>{language.t('full-test')}</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
  },
  imageBanner: {
    width: width - 20,
    height: (width * 2) / 5,
    borderRadius: 8,
    marginLeft: 10,
    borderColor: color.grey_300,
    borderWidth: 0.5,
  },
  pagination: {
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  viewContent: {
    marginVertical: 6,
  },
  textTitle: {
    ...globalStyles.text15Bold,
    marginHorizontal: 10,
  },
  flexBox: {
    flexDirection: 'row',
  },
  itemFlex: {
    width: '25%',
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
