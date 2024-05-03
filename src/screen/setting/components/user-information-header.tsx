import {Dimensions, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useCallback} from 'react';
import FastImage from 'react-native-fast-image';
import useAvatarDefault from '@/stores/avatar.store';
import useAccountStore from '@/stores/account.store';
import globalStyles, {color} from '@/global-style';
import {Icon} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import ImageViewerDetail from '@/screen/components/image-view/image-viewer';
import ChooseImage from '@/screen/components/camera/modal-action-chose-image';
import {TPickedImage} from '@/utils/images/image';
import {useMutation} from '@tanstack/react-query';
import uploadService from '@/utils/api/image-file';
import useUpdateUserInfo from '@/hooks/use-update-image-user';
import Loading from '@/screen/components/loading/loading';

const {width} = Dimensions.get('window');

const UserInformationHeader = () => {
  const account = useAccountStore(state => state?.account);
  const avatarDefault = useAvatarDefault(state => state?.avatarDefault);
  const language = useTranslation();

  const [isCoverAvatar, setIsCoverAvatar] = useState(true);
  const [visible, setVisible] = useState({
    isVisible: false,
    index: 0,
  });

  const [state, setState] = useState({
    isVisibleAvatar: false,
    isVisibleCoverAvatar: false,
  });

  const {updateAvatar, updateCoverAvatar} = useUpdateUserInfo();

  const {mutate: changeAvatar, status: statusAvatar} = useMutation({
    mutationFn: (avatar: TPickedImage) => uploadService.uploadImages([avatar]),
    onSuccess: ({data}) => {
      updateAvatar(data[0]);
    },
  });

  const {mutate: handleCoverAvatar, status: statusCoverAvatar} = useMutation({
    mutationFn: (coverAvatar: TPickedImage) =>
      uploadService.uploadImages([coverAvatar]),
    onSuccess: ({data}) => {
      updateCoverAvatar(data[0]);
    },
  });

  const handleChoseAvatar = () => {
    setState(old => ({...old, isVisibleAvatar: true}));
  };

  const handleChoseCoverAvatar = () => {
    setState(old => ({...old, isVisibleCoverAvatar: true}));
  };

  const closeModal = () => {
    setState({isVisibleCoverAvatar: false, isVisibleAvatar: false});
  };

  const toggleOverlay = useCallback(() => {
    setVisible({
      isVisible: !visible.isVisible,
      index: 0,
    });
  }, [visible.isVisible]);

  return (
    <View style={styles.container}>
      <View style={{position: 'relative'}}>
        <Pressable
          onPress={() => {
            toggleOverlay();
            setIsCoverAvatar(true);
          }}>
          <FastImage
            source={{
              uri: account?.coverImageUrl ?? avatarDefault,
            }}
            style={styles.coverImage}
          />
        </Pressable>
        <Pressable
          onPress={handleChoseCoverAvatar}
          style={{position: 'absolute', bottom: 10, right: 16, zIndex: 1}}>
          <Icon
            onPress={handleChoseCoverAvatar}
            name="camera"
            type="ionicon"
            color={color.grey_800}
            containerStyle={styles.containerIcon}
          />
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <Pressable
          onPress={() => {
            toggleOverlay();
            setIsCoverAvatar(false);
          }}>
          <FastImage
            source={{
              uri: account?.imageUrl ?? avatarDefault,
            }}
            style={styles.avatar}
          />
        </Pressable>
        <View style={{marginLeft: 10}}>
          <Text style={styles.textName} numberOfLines={1}>
            {account?.name}
          </Text>
          <Text onPress={handleChoseAvatar} style={styles.text}>
            {language.t('changeAvatar')}
          </Text>
        </View>
      </View>

      <ImageViewerDetail
        visible={visible}
        toggleOverlay={toggleOverlay}
        imageUrls={
          isCoverAvatar
            ? [account?.coverImageUrl ?? avatarDefault]
            : [account?.imageUrl ?? avatarDefault]
        }
      />

      {state.isVisibleAvatar && (
        <ChooseImage
          isVisible={state.isVisibleAvatar}
          titleModal="Chọn ảnh"
          closeModal={closeModal}
          handleAction={changeAvatar}
        />
      )}

      {state.isVisibleCoverAvatar && (
        <ChooseImage
          isVisible={state.isVisibleCoverAvatar}
          titleModal="Chọn ảnh bìa"
          closeModal={closeModal}
          handleAction={handleCoverAvatar}
        />
      )}

      {(statusAvatar === 'pending' || statusCoverAvatar === 'pending') && (
        <Loading />
      )}
    </View>
  );
};

export default UserInformationHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white',
  },
  coverImage: {
    width: width,
    height: (width * 3) / 7,
    alignSelf: 'center',
  },
  containerIcon: {
    marginLeft: 10,
    backgroundColor: '#F1F2F8',
    padding: 5,
    aspectRatio: 1,
    borderRadius: 20,
  },
  textName: {
    ...globalStyles.text20SemiBold,
    color: 'black',
    width: '100%',
    marginTop: 15,
  },
  text: {
    ...globalStyles.text16Regular,
    color: color.green_500,
  },
  contentContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -30,
  },
});
