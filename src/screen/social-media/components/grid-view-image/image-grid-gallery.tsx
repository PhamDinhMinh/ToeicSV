import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SingleImage from './single-image';
import ImageViewerDetail from '@/screen/components/image-view/image-viewer';
import DoubleImages from './double-image';
import TripleImages from './tripple-image';
import MultiImages from './multi-image';

type TImagesGridGallery = {
  images: string[];
  postId?: number;
  navigation?: any;
};

const ImagesGridGallery = ({
  images,
  postId,
  navigation,
}: TImagesGridGallery) => {
  const [visible, setVisible] = useState({
    isVisible: false,
    index: 0,
  });

  const toggleOverlay = (index: number) => {
    setVisible({
      isVisible: !visible.isVisible,
      index: index,
    });
  };

  const goToFullView = useCallback(() => {
    navigation.navigate('SocialMediaStack', {
      screen: 'PostDetailScreen',
      params: {postId: postId},
    });
  }, [navigation, postId]);

  return (
    <View style={[styles.container]}>
      {images.length === 1 ? (
        <SingleImage image={images[0]} toggleOverlay={toggleOverlay} />
      ) : images.length === 2 ? (
        <DoubleImages images={images} toggleOverlay={toggleOverlay} />
      ) : images.length === 3 ? (
        <TripleImages images={images} toggleOverlay={toggleOverlay} />
      ) : (
        <MultiImages
          images={images}
          toggleOverlay={toggleOverlay}
          goToFullView={goToFullView}
        />
      )}

      <ImageViewerDetail
        visible={visible}
        toggleOverlay={toggleOverlay}
        imageUrls={images}
      />
    </View>
  );
};

export default ImagesGridGallery;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
