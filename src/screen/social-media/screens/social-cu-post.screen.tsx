import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {TSocialMediaStackParamList} from '@/routes/social-media-stack';
import {Avatar, Button, Icon} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import globalStyles, {color} from '@/global-style';
import LinearGradient from 'react-native-linear-gradient';
import useAvatarDefault from '@/stores/avatar.store';
import useAccountStore from '@/stores/account.store';
import FooterCUPost from '../components/footer-cu-post';
import FastImage from 'react-native-fast-image';
import FeelEmotions from '../components/feeling-emotions/feeling-emotions';
import listBackground from '../components/background/background-post';
import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import socialMediaService from '../services/social-media.service';
import Toast from 'react-native-toast-message';
import Loading from '@/screen/components/loading';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<TSocialMediaStackParamList, 'SocialCUPostScreen'>;

const SocialCUPostScreen = ({navigation, route}: props) => {
  const {post, indexEmoji} = route.params;

  const uid = useId();
  const queryClient = useQueryClient();
  const account = useAccountStore(state => state?.account);
  const avatarDefault = useAvatarDefault(state => state?.avatarDefault);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {isDirty},
  } = useForm({
    defaultValues: {
      contentPost: post?.contentPost ?? '',
      imageUrls: post?.imageUrls ?? [],
      emotionId: indexEmoji,
      backGroundId: post?.backGroundId ?? null,
      //   listImage: [] as TPickedImage[],
    },
  });

  const inputRef = useRef<any>();

  const [background, setBackground] = useState({
    index: post?.backGroundId ?? null,
    choseGround: true,
    openGroundPost: false,
  });

  const language = useTranslation();

  useEffect(() => {
    setValue('emotionId', indexEmoji);
  }, [indexEmoji, setValue]);

  const takeImage = (items: any) => {};

  const chooseImage = (items: any) => {};

  const {mutate: createPost, status: statusCreate} = useMutation({
    mutationFn: (params: any) => socialMediaService.createPost(params),
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['list-post']});
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: language.t('create-success'),
        topOffset: 80,
        visibilityTime: 500,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: error?.data,
        topOffset: 80,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
    },
  });

  const {mutate: updatePost, status: statusUpdate} = useMutation({
    mutationFn: (params: any) => socialMediaService.updatePost(params),
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['list-post']});
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: language.t('edit-success'),
        topOffset: 80,
        visibilityTime: 500,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: error?.data,
        topOffset: 80,
        text1Style: {fontSize: 16, fontWeight: '400'},
      });
    },
  });

  const onSubmit = useCallback(
    (data: any) => {
      post?.id ? updatePost(data) : createPost(data);
    },
    [createPost, post?.id, updatePost],
  );

  const toggleBackgroundHandle = useCallback((toggleBackground: boolean) => {
    setBackground(prev => ({...prev, openGroundPost: toggleBackground}));
  }, []);

  const handleChooseBack = useCallback(
    (indexBR: number | null) => {
      setBackground(prev => ({...prev, index: indexBR}));
      setValue('backGroundId', indexBR);
    },
    [setValue],
  );

  const handleContentSizeChange = useCallback(
    (heightContent: number) => {
      if (heightContent > 240) {
        setBackground(prev => ({...prev, index: null, openGroundPost: false}));
        setValue('backGroundId', null);
      }
    },
    [setValue],
  );

  const renderLeft = useCallback(
    () => (
      <View style={{marginLeft: 10}}>
        <Button
          onPress={() => navigation.goBack()}
          title={language.t('cancel')}
          type="clear"
          titleStyle={[styles.buttonTitle]}
        />
      </View>
    ),
    [language, navigation],
  );

  const renderRight = useCallback(
    () => (
      <Button
        title={post?.id ? language.t('save') : language.t('send-post')}
        disabled={
          (getValues('contentPost') === '' &&
            getValues('imageUrls').length === 0) ||
          statusCreate === 'pending' ||
          statusUpdate === 'pending'
        }
        titleStyle={{...styles.buttonTitle}}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        linearGradientProps={{
          colors: [color.green_300, color.green_500],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        }}
        ViewComponent={LinearGradient}
        onPress={handleSubmit(onSubmit)}
      />
    ),
    [
      getValues,
      handleSubmit,
      language,
      onSubmit,
      post?.id,
      statusCreate,
      statusUpdate,
    ],
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: renderLeft,
      headerRight: renderRight,
      headerTitleAlign: 'center',
      title: post?.id ? language.t('edit-post') : language.t('create-post'),
      headerTitleStyle: {...globalStyles.text17Medium},
    });
  }, [language, navigation, post, renderLeft, renderRight]);

  const inputAccessoryViewID = 'contentInput';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar
          source={{
            uri: account?.imageUrl ?? avatarDefault,
          }}
          size={50}
          containerStyle={{backgroundColor: color.grey_400}}
          rounded
        />
        <View style={styles.headerInfo}>
          <Text style={styles.textName}>
            {account?.name?.replace(/^\s+/, '')}
          </Text>
          {indexEmoji !== null && indexEmoji !== undefined && (
            <>
              <Text style={{...globalStyles.text16Regular}}>
                {language.t('progress')}
              </Text>
              <FastImage
                source={{
                  uri: FeelEmotions[indexEmoji].icon,
                }}
                style={{width: 20, height: 20}}
              />
              <Text style={{...globalStyles.text16Regular}}>
                {language.t('feel')}
              </Text>
              <Text style={{...globalStyles.text16Regular}}>
                {language.t(FeelEmotions[indexEmoji].des) ?? ''}
              </Text>
            </>
          )}
        </View>
      </View>
      <ScrollView>
        <View>
          {background.index !== null ? (
            <Pressable
              onPress={() => {
                if (inputRef.current?.isFocused()) {
                  Keyboard.dismiss();
                } else {
                  inputRef.current?.focus();
                }
              }}
              style={styles.inputBackgroundContainer}>
              <ImageBackground
                source={{
                  uri: listBackground[background.index].linkBackGround,
                }}
                resizeMode="cover"
                style={{
                  height: 270,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Controller
                  control={control}
                  name="contentPost"
                  render={({field: {value, onChange}}) => (
                    <View style={styles.viewInput}>
                      <TextInput
                        inputAccessoryViewID={inputAccessoryViewID}
                        ref={inputRef}
                        value={value}
                        placeholder={language.t('what-on-ur-mind')}
                        placeholderTextColor={
                          listBackground[background.index]?.colorText
                        }
                        onChangeText={onChange}
                        multiline
                        style={[
                          styles.inputBackground,
                          {
                            color: listBackground[background.index]?.colorText,
                          },
                        ]}
                        onContentSizeChange={e =>
                          handleContentSizeChange(
                            e.nativeEvent.contentSize.height,
                          )
                        }
                        autoCorrect={false}
                      />
                    </View>
                  )}
                />
              </ImageBackground>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                if (inputRef.current?.isFocused()) {
                  Keyboard.dismiss();
                } else {
                  inputRef.current?.focus();
                }
              }}
              style={styles.inputContainer}>
              <Controller
                control={control}
                name="contentPost"
                render={({field: {value, onChange}}) => (
                  <TextInput
                    inputAccessoryViewID={inputAccessoryViewID}
                    ref={inputRef}
                    value={value}
                    placeholder={language.t('what-on-ur-mind')}
                    onChangeText={onChange}
                    multiline
                    style={styles.input}
                  />
                )}
              />
            </Pressable>
          )}
          {/* <View style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
          </View> */}
        </View>
      </ScrollView>
      <View>
        {background.choseGround && (
          <Pressable onPress={() => toggleBackgroundHandle(true)}>
            <FastImage
              source={{
                uri: 'https://www.facebook.com/images/composer/SATP_Aa_square-2x.png',
              }}
              style={[
                styles.groupBackground,
                {
                  display: background.openGroundPost ? 'none' : 'flex',
                  width: 50,
                  height: 50,
                  marginLeft: 20,
                },
              ]}
            />
          </Pressable>
        )}
        {background.choseGround && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={[
                styles.groupBackground,
                {
                  display: !background.openGroundPost ? 'none' : 'flex',
                  flexDirection: 'row',
                },
              ]}>
              {listBackground.map(item => {
                return (
                  <Pressable
                    key={uid + item.index}
                    onPress={() => handleChooseBack(item.index)}>
                    <FastImage
                      source={{
                        uri: listBackground[item.index].link,
                      }}
                      style={[
                        styles.itemBackground,
                        {
                          marginHorizontal: 5,
                          marginRight:
                            indexEmoji === listBackground.length - 1 ? 32 : 3,
                        },
                      ]}
                    />
                  </Pressable>
                );
              })}
            </ScrollView>
            <Pressable
              style={[
                styles.iconRight,
                {display: !background.openGroundPost ? 'none' : 'flex'},
              ]}
              onPress={() => toggleBackgroundHandle(false)}>
              <Icon type="antdesign" name="right" size={24} />
            </Pressable>
            <Pressable
              style={[
                styles.iconLeft,
                {display: !background.openGroundPost ? 'none' : 'flex'},
              ]}
              onPress={() => toggleBackgroundHandle(false)}>
              <Icon type="fontisto" name="nav-icon-grid" size={24} />
            </Pressable>
          </View>
        )}
        <View style={styles.footer}>
          <FooterCUPost
            takeImage={takeImage}
            chooseImage={chooseImage}
            newfeed
            post={post}
            navigation={navigation}
          />
        </View>
      </View>

      {(statusUpdate === 'pending' || statusCreate === 'pending') && (
        <Loading />
      )}
    </SafeAreaView>
  );
};

export default SocialCUPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 5,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonTitle: {
    ...globalStyles.text15Bold,
  },
  button: {
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 10,
  },
  textName: {
    ...globalStyles.text20Regular,
    color: '#000',
  },
  inputBackgroundContainer: {
    marginTop: 10,
    height: 280,
    justifyContent: 'center',
  },
  viewInput: {
    height: 270,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputBackground: {
    paddingHorizontal: 35,
    ...globalStyles.text17Bold,
    fontSize: 24,
    textAlign: 'center',
    width: width,
  },
  inputContainer: {
    marginTop: 10,
    height: 100,
    paddingHorizontal: 15,
  },
  input: {
    ...globalStyles.text17Medium,
    color: '#000',
  },
  groupBackground: {
    width: width - 80,
    marginLeft: 40,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  itemBackground: {
    width: 44,
    height: 44,
    marginBottom: 3,
    borderRadius: 12,
  },
  iconRight: {
    alignItems: 'center',
    height: 44,
    width: 44,
    backgroundColor: '#E6E4EB',
    justifyContent: 'center',
    borderRadius: 12,
    position: 'absolute',
    zIndex: 5,
    marginLeft: 23,
    marginBottom: 3,
  },
  iconLeft: {
    alignItems: 'center',
    height: 44,
    width: 44,
    backgroundColor: '#E6E4EB',
    justifyContent: 'center',
    borderRadius: 12,
    position: 'absolute',
    zIndex: 5,
    right: 23,
    marginBottom: 3,
  },
  footer: {
    position: 'relative',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
});
