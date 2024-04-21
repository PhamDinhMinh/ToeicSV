import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';
import ImageViewerDetail from '@/screen/components/image-view/image-viewer';
import {faker} from '@faker-js/faker';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('screen').width;

type TImagesGridView = {
  images: string[];
  editable?: boolean;
  deleteImageHandle?: (_t: string) => void;
};

const ImagesGridView = ({
  images = [],
  editable = false,
  deleteImageHandle = (_t: string) => {},
}: TImagesGridView) => {
  const [visible, setVisible] = useState({
    isVisible: false,
    index: 0,
  });

  const toggleOverlay = (index: number) => {
    setVisible({isVisible: !visible.isVisible, index: index});
  };

  if (images.length > 0) {
    return (
      <View style={[styles.container]}>
        {images.map((item, index) => (
          <Pressable
            key={faker.string.uuid()}
            onPress={() => toggleOverlay(index)}
            style={{
              flexBasis: '31%',
              marginHorizontal: index % 3 === 1 ? '3.5%' : 0,
              marginVertical: 0.0175 * width,
            }}>
            <FastImage
              key={faker.string.uuid()}
              resizeMode="cover"
              source={{uri: item}}
              style={{
                width: '100%',
                aspectRatio: 1,
                borderRadius: 10,
              }}
            />
            {editable && (
              <Icon
                onPress={() => deleteImageHandle(item)}
                name="close"
                containerStyle={styles.deleteImageIcon}
              />
            )}
          </Pressable>
        ))}
        {visible.isVisible && (
          <ImageViewerDetail
            visible={visible}
            toggleOverlay={toggleOverlay}
            imageUrls={images}
          />
        )}
      </View>
    );
  }
  return <></>;
};

export default ImagesGridView;

const styles = StyleSheet.create({
  deleteImageIcon: {
    position: 'absolute',
    zIndex: 10,
    right: -5,
    top: -5,
    backgroundColor: 'white',
    aspectRatio: 1,
    borderRadius: 20,
    padding: 5,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
