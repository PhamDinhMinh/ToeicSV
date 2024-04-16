import React, {memo, useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import {IPostResponse} from '../services/social-media.model';
import {useTranslation} from 'react-i18next';
import globalStyles from '@/global-style';
import HeaderSocialPostItem from './header-post-item';
import BackGroundPost from './background-content-post';
import {Icon} from '@rneui/base';
import ContentSocialPostItem from './content-social-post-item';
import listEmoji from './react/list-emoji';
import SocialSharePost from './social-share-modal';

const width = Dimensions.get('screen').width;

type TSocialPostItem = {
  post: IPostResponse;
  navigation?: any;
  isViewPost?: boolean;
  isVisible?: boolean;
};

type TReact = {
  count: number;
  state: number;
};

const SocialPostItem = (props: TSocialPostItem) => {
  const {post, navigation, isViewPost = false, isVisible = true} = props;

  const lastItemId = useRef(post.id);
  const language = useTranslation();

  const [visibleOptions, setVisibleOptions] = useState(false);
  const [react, setReact] = useState<any>({
    userReact: post?.userReact ?? null,
    countReact: post?.countReact ?? 0,
    listReact:
      post?.reactStates.sort((a: TReact, b: TReact) => b.count - a.count) ?? [],
  });

  const buttonRef = useRef<any>(null);
  const [state, setState] = useState({
    modalShare: false,
    modalRules: false,
    modalEmoji: false,
  });

  const toggleModalShare = () => {
    setState(prevState => ({
      ...prevState,
      modalShare: !prevState.modalShare,
    }));
  };

  const toggleOptions = useCallback(() => {
    setVisibleOptions(!visibleOptions);
  }, [visibleOptions]);

  const goCommentScreen = () => {
    navigation.navigate('SocialMediaStack', {
      screen: 'SocialCommentPostScreen',
      params: {postId: post.id},
    });
  };

  const goProfileScreen = () => {};

  return (
    <View style={styles.container}>
      <HeaderSocialPostItem
        post={post}
        visibleOptions={visibleOptions}
        toggleOptions={toggleOptions}
        navigation={navigation}
      />
      <View style={{marginTop: 16}}>
        <View style={{marginHorizontal: 10}}>
          {post.backGroundId === null && post.contentPost && (
            <ContentSocialPostItem post={post} />
          )}

          {post.backGroundId !== null &&
            post.backGroundId !== undefined &&
            post.imageUrls?.length === 0 && <BackGroundPost post={post} />}

          {/* {item.imageUrls?.length > 0 || item.videoUrls?.length > 0 ? (
            isViewPost ? (
              <ImagesGridView images={item.imageUrls} videos={item.videoUrls} />
            ) : (
              <View>
                <ImagesGridGallery
                  isVisible={isVisible}
                  postId={item.id}
                  fileUrls={fileUrls}
                  goToView={goToViewPost}
                />
              </View>
            )
          ) : null} */}

          <View style={styles.footer}>
            <View style={styles.footerHeader}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                  height: 30,
                }}>
                <View
                  style={{
                    paddingRight: 5,
                    alignItems: 'center',
                  }}>
                  {react?.listReact && react?.listReact?.length === 0 ? (
                    listEmoji[0].emoji({
                      width: 18,
                      height: 18,
                    })
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        // width: 30,
                      }}>
                      {react?.listReact.map(
                        (itemState: TReact, index: number) => {
                          if (
                            itemState.state !== undefined &&
                            itemState.state >= 0
                          ) {
                            if (index >= 3) {
                              return <View />;
                            }
                            return (
                              <View
                                style={{
                                  position: 'absolute',
                                  top: 5,
                                  zIndex: 10 - index,
                                  left: 14 * index,
                                }}>
                                {listEmoji[itemState.state].emoji({
                                  width: 18,
                                  height: 18,
                                })}
                              </View>
                            );
                          }
                        },
                      )}
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.textButton,
                    {
                      marginLeft:
                        react?.listReact?.length >= 3
                          ? 3 * 15
                          : react?.listReact?.length * 15,
                    },
                  ]}>
                  {react.countReact}
                </Text>
              </Pressable>

              <Pressable onPress={goCommentScreen}>
                <Text style={styles.textButton}>
                  {post.countComment} {language.t('comment')}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                height: 50,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                // onLongPress={handlePressIn}
                // onPressOut={handlePressOut}
                ref={buttonRef}
                delayLongPress={600}
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 10,
                    paddingVertical: 5,
                  },
                ]}>
                {/* {react.reactState !== null && react.reactState !== -1 ? (
                  <View style={{marginRight: 5}}>
                    {listEmoji[react.reactState ? react.reactState : 0]?.emoji({
                      width: 20,
                      height: 20,
                    })}
                  </View>
                ) : (
                  <View style={{marginRight: 5}}>
                    <Icon
                      name={'like2'}
                      color={
                        // ? '#4EA3F8'
                        '#65676B'
                      }
                      type="antdesign"
                    />
                  </View>
                )} */}
                {react.userReact === null || react.userReact === -1 ? (
                  <Text style={[styles.textButton, {color: '#65676B'}]}>
                    Thích
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.textButton,
                      {
                        color:
                          listEmoji[
                            react.reactState !== null && react.reactState !== -1
                              ? react.reactState
                              : 0
                          ]?.color,
                      },
                    ]}>
                    {language.t(
                      listEmoji[
                        react.reactState !== null && react.reactState !== -1
                          ? react.reactState
                          : 0
                      ]?.des,
                    )}
                  </Text>
                )}
              </Pressable>
              <TouchableOpacity
                onPress={goCommentScreen}
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={{marginRight: 5}}
                  color="#65676B"
                  name="chatbox-outline"
                  type="ionicon"
                />
                <Text
                  style={[
                    styles.textButton,
                    {color: '#65676B', textTransform: 'capitalize'},
                  ]}>
                  {language.t('comment')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={toggleShareModal}
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={{marginRight: 5}}
                  color="#65676B"
                  name="arrow-redo-outline"
                  type="ionicon"
                />
                <Text
                  style={[
                    styles.textButton,
                    {color: '#65676B', textTransform: 'capitalize'},
                  ]}>
                  {language.t('share')}
                </Text>
              </TouchableOpacity>
              {/* Chỗ này hiện các icon */}
              {/* {visibleEmoji && (
                <ModalPopUpEmoji
                  visibleEmoji={visibleEmoji}
                  handleModalClose={handleModalClose}
                  modalPositionTop={modalPosition.top}
                  modalPositionLeft={modalPosition.left}
                  handleChooseIcon={handleChooseIcon}
                  currentEmoji={currentEmoji}
                  marginBottom={90}
                />
              )} */}
            </View>
          </View>
        </View>
      </View>

      {state.modalShare && (
        <SocialSharePost
          modalShare={state.modalShare}
          handleCloseModalShare={toggleModalShare}
          goToProfile={goProfileScreen}
          postId={post.id}
        />
      )}
    </View>
  );
};

export default memo(SocialPostItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: width < 440 ? 0 : 10,
    // paddingTop: 5,
    // paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 5,
  },
  textName: {
    ...globalStyles.text17Bold,
    color: '#000',
  },
  textContent: {
    ...globalStyles.text17Medium,
    color: '#000',
  },
  textButton: {
    ...globalStyles.text15SemiBold,
    color: '#65676B',
    marginVertical: 5,
    fontWeight: '400',
    lineHeight: 18,
  },
  footerWaiting: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textTittleWaiting: {
    ...globalStyles.text17Bold,
    color: '#000',
  },
  footer: {},
  footerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 5,
  },
});
