import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IResponseExamAll} from '../services/home.model';
import FastImage from 'react-native-fast-image';
import globalStyles from '@/global-style';
import {Button} from '@rneui/themed';

const {width} = Dimensions.get('screen');

type TExamToeicVertical = {
  exam: IResponseExamAll;
  navigation: any;
};

const ItemExamVertical = ({exam, navigation}: TExamToeicVertical) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.content}>
        <FastImage
          style={styles.imageBanner}
          source={require('@/assets/images/exam-icons.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.groupLeft}>
          <View>
            <Text style={styles.textTitle} numberOfLines={2}>
              {exam.nameExam}
            </Text>
            <Text>Thời gian: 120 phút </Text>
            <Text>Câu hỏi: 200</Text>
          </View>
          <Button
            buttonStyle={styles.button}
            type="solid"
            title={'Bắt đầu'}
            titleStyle={{color: 'white', fontSize: 14}}
            onPress={() =>
              navigation.navigate('ExamDetailScreen', {idExam: exam.id})
            }
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ItemExamVertical;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  content: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 0.2 * width,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 6,
  },
  imageBanner: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  groupLeft: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  textTitle: {
    ...globalStyles.text15Medium,
    marginBottom: 2,
  },
  button: {
    borderRadius: 12,
  },
});
