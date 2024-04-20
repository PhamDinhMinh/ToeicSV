import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useContext, useMemo} from 'react';
import globalStyles, {color} from '@/global-style';
import FastImage from 'react-native-fast-image';
import {Button, Icon} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import socialMediaService from '../services/social-media.service';
import useAccountStore from '@/stores/account.store';
import useAvatarDefault from '@/stores/avatar.store';

const {width} = Dimensions.get('window');

const HeaderProfile = ({
  userId,
  navigation,
}: {
  userId: number;
  navigation: any;
}) => {
  const language = useTranslation();
  const queryClient = useQueryClient();
  const userInformation = useAccountStore(state => state?.account);
  const avatarDefault = useAvatarDefault(state => state?.avatarDefault);

  const {data: dataUser} = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () =>
      socialMediaService.getUserInformation({
        id: userId,
      }),
    // staleTime: 300000,
    enabled: !!userId,
  });

  const [isVisibleModal, setVisibleModal] = useState(false);
  const [visible, setVisible] = useState({
    isVisible: false,
    index: 0,
  });

  const uriAvatar = useMemo(() => {
    return dataUser?.data?.id === userInformation?.id
      ? userInformation?.imageUrl ?? avatarDefault
      : dataUser?.data?.imageUrl ?? avatarDefault;
  }, [
    avatarDefault,
    dataUser?.data?.id,
    dataUser?.data?.imageUrl,
    userInformation?.id,
    userInformation?.imageUrl,
  ]);

  const uriCoverAvatar = useMemo(() => {
    return dataUser?.data?.id === userInformation?.id
      ? userInformation?.coverImageUrl ?? avatarDefault
      : dataUser?.data?.coverImageUrl ?? avatarDefault;
  }, [
    avatarDefault,
    dataUser?.data?.coverImageUrl,
    dataUser?.data?.id,
    userInformation?.coverImageUrl,
    userInformation?.id,
  ]);

  console.log(userInformation);

  const handleChose = () => {
    setVisibleModal(true);
  };

  //   const closeModal = () => {
  //     setVisibleModal(false);
  //   };

  //   const handleCloseModalAction = () => {
  //     setModalAction(false);
  //   };

  //   const {uploadUserImage} = useUpdateUserInfo();

  //   const changeAvatar = (image: TPickedImage) => {
  //     uploadUserImage({
  //       ...image,
  //       type: 'imageUrl',
  //     });
  //   };

  //   const toggleOverlay = () => {
  //     if (!setFileUrls || !toggleWallOverlay) {
  //       setVisible({isVisible: !visible.isVisible, index: 0});
  //     } else {
  //       setFileUrls([{url: listPath}]);
  //       toggleWallOverlay(0);
  //     }
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{position: 'relative'}}>
        <FastImage
          source={{
            uri: uriCoverAvatar,
          }}
          style={styles.coverImage}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 30,
          marginTop: -70,
          marginBottom: 16,
        }}>
        <Pressable
          style={{
            borderWidth: 0.5,
            borderRadius: 50,
            width: 101,
            borderColor: color.grey_200,
          }}>
          <FastImage
            source={{
              uri: uriAvatar,
            }}
            style={styles.avatar}
          />
        </Pressable>
        {userInformation?.id === dataUser?.data?.id && (
          <Pressable style={styles.iconCamera} onPress={handleChose}>
            <Icon name="camera" type="fontisto" color="#555" size={18} />
          </Pressable>
        )}
      </View>
      <View
        style={{
          marginLeft: 20,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.textName}>
          {dataUser?.data?.name?.replace(/^\s+/, '')}
        </Text>
      </View>
      {/* {!setFileUrls && (
        <MediaPlayer
          fileUrls={[{url: uriAvatar}]}
          visible={visible}
          toggleOverlay={toggleOverlay}
        />
      )} */}

      {/* Hiện modal ở đây */}
      {/* <ChooseImage
        isVisible={isVisibleModal}
        titleModal="Chọn ảnh"
        closeModal={closeModal}
        handleAction={changeAvatar}
      /> */}
    </SafeAreaView>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    backgroundColor: 'white',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: color.grey_200,
  },
  coverImage: {
    width: width,
    height: 200,
    alignSelf: 'center',
  },
  textName: {
    ...globalStyles.text22Bold,
    color: '#000',
  },
  text: {
    ...globalStyles.text16Regular,
    color: '#000',
  },
  iconCamera: {
    position: 'absolute',
    left: 80,
    top: 60,
    backgroundColor: '#ccc',
    marginLeft: 15,
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: -16,
    paddingLeft: 16,
    marginTop: 10,
  },
  buttonContainer: {flex: 1, marginLeft: 16},
  button: {
    borderRadius: 20,
    backgroundColor: '#78B7EE',
  },
  containerFriend: {
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  groupItem: {
    paddingTop: 10,
  },
  itemIcon: {
    backgroundColor: '#ccc',
    width: 36,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textItem: {
    ...globalStyles.text16Medium,
    color: 'black',
  },
});
