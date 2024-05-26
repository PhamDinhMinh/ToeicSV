import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {THomeStackParamList} from '@/routes/home-stack';
import FastImage from 'react-native-fast-image';
import {usePartImage} from '@/hooks/use-icon-part';
import globalStyles, {color} from '@/global-style';
import {useTranslation} from 'react-i18next';
import {Button, Switch} from '@rneui/themed';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<THomeStackParamList, 'PartDetailScreen'>;

const PartDetailScreen = ({route, navigation}: props) => {
  const {item} = route.params;

  const language = useTranslation();
  const [checked, setChecked] = useState(false);

  const goToTest = useCallback(() => {
    navigation.navigate('QuestionDetailScreen', {
      partId: item?.value,
      maxResultCount: item?.maxResultCount,
    });
  }, [item?.maxResultCount, item?.value, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: item.content,
    });
  }, [item.content, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.viewImage}>
          <FastImage
            style={styles.imagePart}
            source={usePartImage(item.value)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View>
          <Text style={styles.textHeader}>Số câu đúng: 9</Text>
          <Text style={styles.textHeader}>Số câu đã làm: 0 </Text>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.descriptionPart}>
          <Text style={styles.headerContent}>{language.t('question')}</Text>
          <View style={{marginVertical: 10}}>
            <Text style={styles.textDescription}>{item.description}</Text>
          </View>
          <Text style={styles.textDescription}>{item.transcription}</Text>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.headerFooter}>
          <View style={[styles.itemFooter, {marginRight: 30}]}>
            <Text>Số câu hỏi: </Text>
            <Text>{item?.maxResultCount}</Text>
          </View>
          <View style={styles.itemFooter}>
            <Text>Kiểm tra</Text>
            <Switch
              value={checked}
              onValueChange={value => setChecked(value)}
              color={color.green_base_500}
              style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
            />
          </View>
        </View>
        <Button
          onPress={goToTest}
          containerStyle={{marginVertical: 10}}
          buttonStyle={{
            marginHorizontal: 20,
            borderRadius: 20,
            backgroundColor: color.green_base_300,
          }}
          title="Bắt đầu ngay"
        />
      </View>
    </SafeAreaView>
  );
};

export default PartDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFFA2',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewImage: {
    padding: 15,
    paddingHorizontal: 20,
  },
  imagePart: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textHeader: {
    ...globalStyles.text15Regular,
  },
  content: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    maxHeight: (width * 2) / 3,
  },
  descriptionPart: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  headerContent: {
    textDecorationLine: 'underline',
    lineHeight: 24,
    ...globalStyles.text16Regular,
  },
  textDescription: {
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  headerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchStyle: {
    fontSize: 16,
    height: 10,
  },
});
