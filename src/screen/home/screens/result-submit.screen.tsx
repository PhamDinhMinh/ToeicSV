import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {THomeStackParamList} from '@/routes/home-stack';
import {StackScreenProps} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import globalStyles, {color} from '@/global-style';
import {Button} from '@rneui/themed';
import {StackActions} from '@react-navigation/native';

type props = StackScreenProps<THomeStackParamList, 'ResultSubmitScreen'>;

const ResultSubmitScreen = ({navigation, route}: props) => {
  const {item} = route.params;

  const percent = useMemo(
    () =>
      ((item?.totalCorrect ?? 1) /
        ((item?.totalWrong ?? 1) + (item?.totalCorrect ?? 1))) *
      100,
    [item?.totalCorrect, item?.totalWrong],
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <FastImage
            style={{width: 160, height: 160, marginVertical: 10}}
            source={require('@/assets/images/cup.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.textCongratulation}>Chúc mừng</Text>
          <Text style={styles.textTitle}>
            Bạn đã hoàn thành bài luyện tập này
          </Text>
          {item?.idExam ? (
            <>
              <Text>Nghe hiểu</Text>
              <Text>Đọc hiểu</Text>
            </>
          ) : (
            <>
              <Text>Mô tả ảnh</Text>
              <Text>(Nghe hiểu)</Text>
            </>
          )}
        </View>
        <Text
          style={{
            paddingHorizontal: 20,
            ...globalStyles.text14Medium,
            marginVertical: 10,
          }}>
          Kết quả: {item?.totalCorrect}/
          {Number((item?.totalWrong ?? 0) + (item?.totalCorrect ?? 0))}
        </Text>
        <View style={styles.content}>
          <View style={styles.viewResult}>
            <Text>Tỷ lệ đúng</Text>
            <View>
              <Text>{percent.toFixed(2)}%</Text>
            </View>
          </View>
          <View style={styles.slider}>
            <View
              style={[
                styles.viewSlider,
                {
                  width: `${percent}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.textBottom}>
            {percent > 70
              ? 'Ráng giữ phong độ này của bạn nhé!'
              : 'Cố gắng lên! Không được bỏ cuộc'}
          </Text>
        </View>
        {item?.idExam && (
          <View style={[styles.content, {marginTop: 20}]}>
            <Text>
              Điểm nghe:{' '}
              {(((item?.listeningCorrect ?? 1) > 1
                ? item?.listeningCorrect
                : 1) ?? 1 - 1) * 5}
            </Text>
            <Text>
              Điểm đọc:{' '}
              {(((item?.readingCorrect ?? 1) > 1 ? item?.readingCorrect : 1) ??
                1 - 1) * 5}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.titleStyle}
          title="Hiển thị đáp án"
          onPress={() =>
            navigation.navigate('ResultDetailScreen', {itemData: item})
          }
        />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.titleStyle}
          title="Thoát"
          type="outline"
          onPress={() => navigation.dispatch(StackActions.popToTop())}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResultSubmitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
  },
  textCongratulation: {
    ...globalStyles.text16SemiBold,
    marginVertical: 10,
  },
  textTitle: {
    ...globalStyles.text14Regular,
  },
  content: {
    paddingHorizontal: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.grey_300,
    paddingVertical: 14,
  },
  viewResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 5,
    backgroundColor: color.grey_400,
    borderRadius: 100,
  },
  viewSlider: {
    height: 5,
    backgroundColor: color.green_base_500,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  textBottom: {
    textAlign: 'center',
    marginTop: 10,
    ...globalStyles.text14Medium,
    color: color.orange_500,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  button: {
    borderRadius: 12,
  },
  titleStyle: {
    ...globalStyles.text16Medium,
  },
});
