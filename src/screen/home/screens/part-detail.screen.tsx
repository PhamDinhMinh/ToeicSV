import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {THomeStackParamList} from '@/routes/home-stack';
import FastImage from 'react-native-fast-image';
import {usePartImage} from '@/hooks/use-icon-part';
import globalStyles from '@/global-style';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<THomeStackParamList, 'PartDetailScreen'>;

const PartDetailScreen = ({route, navigation}: props) => {
  const {item} = route.params;

  const language = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: item.content,
    });
  }, [item.content, navigation]);

  return (
    <View style={styles.container}>
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
      <View style={styles.footer}></View>
    </View>
  );
};

export default PartDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  footer: {},
});
