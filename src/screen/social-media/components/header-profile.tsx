import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import React, {useState, useMemo, useCallback} from 'react';
import globalStyles, {color} from '@/global-style';
import FastImage from 'react-native-fast-image';
import {Icon} from '@rneui/themed';
import {useQuery} from '@tanstack/react-query';
import socialMediaService from '../services/social-media.service';
import useAccountStore from '@/stores/account.store';
import useAvatarDefault from '@/stores/avatar.store';
import ImageViewerDetail from '@/screen/components/image-view/image-viewer';

const {width} = Dimensions.get('window');

const HeaderProfile = ({userId}: {userId: number}) => {
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

  const [coverAvatar, setCoverAvatar] = useState(true);
  const [visible, setVisible] = useState({
    isVisible: false,
    index: 0,
  });

  const toggleOverlay = useCallback(
    (index: number) => {
      setVisible({
        isVisible: !visible.isVisible,
        index: index,
      });
    },
    [visible.isVisible],
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{position: 'relative'}}
        onPress={() => {
          toggleOverlay(0);
          setCoverAvatar(true);
        }}>
        <FastImage
          source={{
            uri: uriCoverAvatar,
          }}
          style={styles.coverImage}
        />
      </Pressable>
      <View
        style={{
          paddingHorizontal: 30,
          marginTop: -70,
          marginBottom: 16,
        }}>
        <Pressable
          onPress={() => {
            toggleOverlay(0);
            setCoverAvatar(false);
          }}
          style={styles.viewAvatar}>
          <FastImage
            source={{
              uri: uriAvatar,
            }}
            style={styles.avatar}
          />
        </Pressable>
        {userInformation?.id === dataUser?.data?.id && (
          <Pressable style={styles.iconCamera}>
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
      <ImageViewerDetail
        visible={visible}
        toggleOverlay={toggleOverlay}
        imageUrls={coverAvatar ? [uriCoverAvatar] : [uriAvatar]}
      />
    </SafeAreaView>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    backgroundColor: 'white',
  },
  viewAvatar: {
    borderWidth: 0.5,
    borderRadius: 50,
    width: 101,
    borderColor: color.grey_200,
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
