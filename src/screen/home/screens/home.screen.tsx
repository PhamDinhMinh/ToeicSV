import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
  maxResultCount?: number;
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
    'https://media.kenhtuyensinh.vn/images/cms/2018/10/tong-hop-cac-hinh-thuc-luyen-thi-toeic-online-1.jpg',
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
      maxResultCount: 6,
    },
    {
      content: 'Hỏi & đáp',
      value: 2,
      description:
        'In this part of the test, you will hear a question or statement spoken in English, followed by three responses, also spoken in English. The question or statement and the responses ' +
        'will be spoken just one time. They will not be printed in your test book, so you must listen carefully. You are to choose the best response to each question or statement',
      transcription:
        'Trong phần này của đề thi, ban sẽ nghe 1 câu hỏi hoặc 1 câu phát biểu bằng tiếng Anh, theo sau đó là 3 câu phản hồi, cũng được nói bằng tiếng anh. Câu hỏi hay câu phát biểu ' +
        'và các câu phản hồi sẽ chỉ được nói 1 lần. Chúng tôi sẽ không được in lên đề thi, nên bạn cần nghe thật cẩn thận. Bạn cần chọn câu phản hồi đúng nhất với mỗi câu hỏi hoặc câu phát biểu.',
      maxResultCount: 25,
    },
    {
      content: 'Đoạn hội thoại',
      value: 3,
      description:
        'You will hear some conversations between two or more people. You will be asked to answer three questions about what the speakers say in each conversation. Select the best response to each question ' +
        'and mark the letter (A), (B), (C), or (D) on your answer sheet. The conversations will not be printed in your test book and will be spoken only one time.',
      transcription:
        'Bạn sẽ nghe thấy một số cuộc trò chuyện giữa hai hoặc nhiều người. Bạn sẽ được yêu cầu trả lời ba câu hỏi về những gì diễn giả nói trong mỗi cuộc trò chuyện. Chọn câu trả lời đúng nhất cho mỗi câu hỏi ' +
        'và đánh dấu chữ cái (A), (B), (C) hoặc (D) trên phiếu trả lời của bạn. Câu này sẽ không được in trong phần hội thoại trong tập kiểm tra của bạn và sẽ chỉ được nói một lần.',
      maxResultCount: 39,
    },
    {
      content: 'Đoạn nói chuyện ngắn',
      value: 4,
      description:
        'You will hear some talks given by a single speaker. You will be asked to answer three questions about what the speaker says in each talk. Select the best response to each question and mark the letter ' +
        '(A), (B), (C), or (D) on your answer sheet. The talks will not be printed in your test book and will be spoken only one time.',
      transcription:
        'Bạn sẽ nghe một số bài nói do một diễn giả trình bày. Bạn sẽ được yêu cầu trả lời ba câu hỏi về những gì diễn giả nói trong mỗi bài nói. Chọn câu trả lời đúng nhất cho mỗi câu hỏi và đánh dấu chữ cái ' +
        '(A), (B), (C) hoặc (D) trên phiếu trả lời của bạn. Các bài nói sẽ không được in trong tập kiểm tra của bạn và sẽ chỉ được nói một lần.',
      maxResultCount: 30,
    },
  ];

  const readingPart = [
    {
      content: 'Điền vào câu',
      value: 5,
      description:
        'A word or parse is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence. ' +
        'Then mark the letter (A), (B), (C) or (D) on your answer sheet.',
      transcription:
        'Một từ hoặc cụm từ bị thiếu trong mỗi câu nói dưới đây. Bốn lựa chọn trả lời được đưa ra dưới mỗi câu hỏi. Hãy chọn đáp án đúng nhất để hoàn thành câu. Sau đó đánh dấu đáp án (A), (B), (C) hoặc (D) vào phần bài làm của bạn.',
      maxResultCount: 30,
    },
    {
      content: 'Điền vào đoạn',
      value: 6,
      description:
        'A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence. Then mark the letter (A), (B), (C), or (D) on your answer sheet.',
      transcription:
        'Một từ hoặc cụm từ bị thiếu trong mỗi câu nói dưới đây. Bốn lựa chọn trả lời được đưa ra dưới mỗi câu hỏi. Hãy chọn đáp án đúng nhất để hoàn thành câu. Sau đó đánh dấu đáp án (A), (B), (C) hoặc (D) vào phần bài làm của bạn.',
      maxResultCount: 16,
    },
    {
      content: 'Đọc hiểu đoạn văn',
      value: 7,
      description:
        'In this part you will read a selection of texts, such as magazine and newspaper articles, e-mails, and instant messages. Each text or set of texts is followed by several questions. Select the best answer for each question ' +
        'and mark the letter (A), (B), (C), or (D) on your answer sheet.',
      transcription:
        'Trong phần này bạn sẽ đọc một số văn bản chọn lọc, chẳng hạn như các bài báo và tạp chí, e-mail và tin nhắn tức thời. Mỗi văn bản hoặc tập hợp văn bản được theo sau bởi một số câu hỏi. Chọn câu trả lời đúng nhất ' +
        'cho mỗi câu hỏi và đánh dấu chữ cái (A), (B), (C) hoặc (D) trên phiếu trả lời của bạn.',
      maxResultCount: 54,
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
                    backgroundColor={color.green_base_500}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
    marginTop: Platform.OS === 'android' ? 10 : 0,
    backgroundColor: '#FFFFFFA2',
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
