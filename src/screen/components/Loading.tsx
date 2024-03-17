import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('screen');

const Loading = () => {
  const language = useTranslation();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={'white'} size={'large'} />
      <Text style={styles.txtLoading}>{language.t('loading')}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    top: height / 3,
    width: width > 440 ? width / 5 : width / 3,
    aspectRatio: 1,
    marginHorizontal: width > 440 ? width * 0.4 : width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    zIndex: 100,
    elevation: 100,
  },
  txtLoading: {
    color: 'white',
    paddingTop: 8,
    fontSize: 14,
  },
});
