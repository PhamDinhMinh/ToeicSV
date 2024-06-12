import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {Icon} from '@rneui/themed';
import ReactNativeModal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import FastImage from 'react-native-fast-image';
import globalStyles from '@/global-style';
import Toast from 'react-native-toast-notifications';
import ImageViewer from 'react-native-image-zoom-viewer';

const {width} = Dimensions.get('screen');

const numberColumn = width > 440 ? 4 : 3;

type TImageViewerDetail = {
  imageUrls: string[];
  visible?: {
    isVisible: boolean;
    index: number;
  };
  toggleOverlay: (index: number) => void;
};

const ImageViewerDetail = ({
  imageUrls = [],
  visible,
  toggleOverlay = _i => {},
}: TImageViewerDetail) => {
  const ref_img_viewer = useRef<any>();
  const toastRef = useRef<Toast>(null);

  const saveHandle = async (uri: string) => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', uri)
      .then(res => {
        CameraRoll.save(res.data, {type: 'photo'})
          .then(_res => {
            toastRef.current?.show('Lưu ảnh thành công', {
              placement: 'center',
              duration: 1000,
            });
          })
          .catch(_error => {
            toastRef.current?.show('Lưu ảnh thất bại', {
              placement: 'center',
              duration: 1000,
            });
          });
      })
      .catch(() => console.error);
  };

  return (
    <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
      {imageUrls.map((image, index) => (
        <Pressable
          onPress={() => {
            toggleOverlay(index);
          }}
          key={image}
          style={{
            marginRight: index % numberColumn !== 2 ? 5 : 0,
            marginTop: 5,
          }}>
          <FastImage
            source={{uri: image}}
            style={{
              aspectRatio: 1,
              borderRadius: 5,
            }}
          />
        </Pressable>
      ))}
      <ReactNativeModal
        onBackButtonPress={() => {
          toggleOverlay(0);
        }}
        isVisible={visible?.isVisible}
        style={{margin: 0}}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        statusBarTranslucent={true}
        useNativeDriverForBackdrop={true}>
        <Toast ref={toastRef} />
        <View style={styles.container}>
          <SafeAreaView style={styles.headerContainer}>
            <Icon
              reverse
              size={20}
              onPress={() => {
                toggleOverlay(0);
              }}
              name="close-outline"
              type="ionicon"
              style={{}}
              // disabled={imageUrls.length === 0}
            />
            <Icon
              onPress={() => {
                ref_img_viewer.current.saveToLocal();
              }}
              reverse
              size={20}
              name="download-outline"
              type="ionicon"
            />
          </SafeAreaView>
          <ImageViewer
            index={visible?.index}
            ref={ref_img_viewer}
            imageUrls={imageUrls.map(image => {
              return {url: image};
            })}
            onSave={uri => saveHandle(uri)}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default ImageViewerDetail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
  },
  zoomView: {
    width: '100%',
    height: '100%',
  },
  text: {...globalStyles.text15Bold, color: 'white'},
});
