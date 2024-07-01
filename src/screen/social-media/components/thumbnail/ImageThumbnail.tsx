import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import SingleImage from '../grid-view-image/single-image';

type TImageThumbnail = {
  link: any;
  cleanupSingleImage: (link: any) => void;
};
const ImageThumbnail = (props: TImageThumbnail) => {
  const {link, cleanupSingleImage} = props;

  return (
    <View key={link} style={styles.container}>
      <Icon
        name="close"
        type="ionicon"
        size={20}
        color="white"
        onPress={() => cleanupSingleImage(link)}
        containerStyle={styles.closeButton}
      />
      <SingleImage
        image={link}
        style={styles.image}
        toggleOverlay={() => {}}
        thumbnail={true}
      />
    </View>
  );
};

export default ImageThumbnail;

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    position: 'absolute',
    top: -10,
    right: 0,
    zIndex: 1,
    padding: 5,
  },
  container: {
    flexBasis: '33%',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {width: '90%', aspectRatio: 1, borderRadius: 10, marginLeft: 10},
});
