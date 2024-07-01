import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {Button, Icon} from '@rneui/themed';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '@/global-style';
import {useTranslation} from 'react-i18next';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getImageObjectFromPicker} from '@/utils/images/image';

type TFooterCUPost = {
  chooseImage: Function;
  takeImage: Function;
  containerStyle?: ViewStyle;
  post: any;
  hideKeyboard?: Function;
  navigation: any;
};

const FooterCUPost = (props: TFooterCUPost) => {
  const {
    chooseImage = () => {},
    takeImage = () => {},
    containerStyle,
    hideKeyboard,
    post = undefined,
    navigation,
  } = props;
  const language = useTranslation();

  const chooseImageHandle = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: false,
      multiple: true,
      maxFiles: 100,
    })
      .then(imagesOrVideo => {
        chooseImage(imagesOrVideo.map(item => getImageObjectFromPicker(item)));
      })
      .catch(() => {});
  };

  const takeImageHandle = async (item: any) => {
    ImageCropPicker.openCamera({
      mediaType: item,
    })
      .then(image => {
        takeImage(getImageObjectFromPicker(image));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable onPress={chooseImageHandle} style={styles.itemContainer}>
        <MaskedView
          style={styles.iconContainer}
          maskElement={
            <Icon
              type="ionicon"
              name="image"
              size={30}
              containerStyle={{flex: 1}}
            />
          }>
          <LinearGradient colors={['#00A400', '#00A400']} style={{flex: 1}} />
        </MaskedView>
        <Text style={styles.text}>{language.t('image')}</Text>
      </Pressable>
      <Pressable
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('SocialFeelEmojiScreen', {post: post})
        }>
        <Icon
          type="material"
          name="insert-emoticon"
          size={30}
          color="#F5C33B"
        />
        <Text style={styles.text}>{language.t('feeling')}</Text>
      </Pressable>
      <Pressable
        onPress={() => takeImageHandle('camera')}
        style={styles.itemContainer}>
        <MaskedView
          style={styles.iconContainer}
          maskElement={
            <Icon
              type="ionicon"
              name="camera"
              size={30}
              containerStyle={{flex: 1}}
            />
          }>
          <LinearGradient
            colors={['#89F7FE', '#66A6FF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{flex: 1}}
          />
        </MaskedView>
        <Text style={styles.text}>{language.t('camera')}</Text>
      </Pressable>
      {hideKeyboard && (
        <Button
          title={language.t('done')}
          type="clear"
          onPress={() => hideKeyboard()}
        />
      )}
    </View>
  );
};

export default FooterCUPost;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconContainer: {height: 30, width: 30},
  text: {...globalStyles.text15Medium, color: 'black', marginLeft: 10},
  modalChoose: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
  },
  textModal: {
    ...globalStyles.text16Medium,
    color: 'black',
    marginLeft: 10,
    marginVertical: 20,
    textAlign: 'center',
  },
  groupButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});
