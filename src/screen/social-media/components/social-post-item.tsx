import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
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
import ModalPopUpEmoji from './react/emoji-modal-popup';
import {useMutation} from '@tanstack/react-query';
import socialMediaService from '../services/social-media.service';
import ImagesGridGallery from './grid-view-image/image-grid-gallery';
import ImagesGridView from './grid-view-image/image-grid-view';

const width = Dimensions.get('screen').width;
const haftHeight = Dimensions.get('screen').height / 2;

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
    countReact: post?.countReact,
    listReact:
      post?.reactStates.sort((a: TReact, b: TReact) => b.count - a.count) ?? [],
  });
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
  const [state, setState] = useState({
    modalShare: false,
    modalEmoji: false,
  });
  const [currentEmoji, setCurrentEmoji] = useState<number | null>(null);
  const [increment, setIncrement] = useState(true);

  const buttonRef = useRef<any>(null);

  useEffect(() => {
    setReact((old: any) => ({
      ...old,
      userReact: post.userReact ?? null,
      countReact: post.countReact ?? 0,
      listReact: post.reactStates ?? [],
    }));
  }, [post]);

  const {mutate: createOrUpdateReact, isPending} = useMutation({
    mutationFn: (params: {
      reactState?: number | null;
      isCancel: boolean;
      create?: boolean;
    }) => {
      type TPayload = {
        reactState?: number | null;
        commentId?: number;
        postId?: number;
        isCancel?: boolean;
        creatorUserId: number;
      };
      const payload: TPayload = {
        postId: post.id,
        reactState: params.reactState,
        isCancel: params.isCancel,
        creatorUserId: post?.user?.id,
      };
      return socialMediaService.createOrUpdateReact(payload);
    },
    onSuccess: (_, params) => {
      if (params.isCancel) {
        if (react.listReact) {
          let booleanState = react?.listReact?.find(
            (itemArray: TReact) => itemArray?.state === react.userReact,
          );
          if (booleanState) {
            booleanState.count = Math.max(0, booleanState.count - 1);
            if (booleanState.count === 0) {
              setReact({
                userReact: params.reactState,
                countReact: react.countReact - 1,
                listReact: react?.listReact
                  .sort((a: TReact, b: TReact) => b.count - a.count)
                  .filter((element: TReact) => element !== booleanState),
              });
            } else {
              setReact({
                userReact: params.reactState,
                countReact: react.countReact - 1,
                listReact: react?.listReact.sort(
                  (a: TReact, b: TReact) => b.count - a.count,
                ),
              });
            }
          }
        }
      } else {
        if (params.create) {
          let stateFind = react?.listReact?.find(
            (itemArray: TReact) => itemArray?.state === params.reactState,
          );
          if (stateFind) {
            stateFind.count = Math.max(0, stateFind.count + 1);
            setReact({
              userReact: params.reactState,
              countReact: react.countReact + 1,
              listReact: react?.listReact.sort(
                (a: TReact, b: TReact) => b.count - a.count,
              ),
            });
          } else {
            setReact({
              userReact: params.reactState,
              countReact: react.countReact + 1,
              listReact: [
                ...react.listReact,
                {count: 1, state: params.reactState},
              ]?.sort((a: TReact, b: TReact) => b.count - a.count),
            });
          }
        } else {
          let stateFind = react?.listReact?.find(
            (itemArray: TReact) => itemArray?.state === params.reactState,
          );
          if (stateFind) {
            let oldState = react?.listReact?.find(
              (itemArray: TReact) => itemArray?.state === react.userReact,
            );
            stateFind.count += 1;
            oldState.count -= 1;
            if (oldState.count === 0) {
              setReact({
                userReact: params.reactState,
                countReact: react.countReact,
                listReact: react?.listReact
                  .sort((a: TReact, b: TReact) => b.count - a.count)
                  .filter((element: TReact) => element !== oldState),
              });
            } else {
              setReact({
                userReact: params.reactState,
                countReact: react.countReact,
                listReact: react?.listReact.sort(
                  (a: TReact, b: TReact) => b.count - a.count,
                ),
              });
            }
          } else {
            let oldState = react?.listReact?.find(
              (itemArray: TReact) => itemArray?.state === react.userReact,
            );
            oldState.count -= 1;
            if (oldState.count === 0) {
              setReact({
                userReact: params.reactState,
                countReact: react.countReact,
                listReact: [
                  ...react.listReact,
                  {count: 1, state: params.reactState},
                ]
                  .sort((a: TReact, b: TReact) => b.count - a.count)
                  .filter((element: TReact) => element !== oldState),
              });
            } else {
              setReact({
                userReact: params.reactState,
                countReact: react.countReact,
                listReact: [
                  ...react.listReact,
                  {count: 1, state: params.reactState},
                ].sort((a: TReact, b: TReact) => b.count - a.count),
              });
            }
          }
        }
      }
    },
  });

  const handlePressIn = () => {
    buttonRef.current.measure(
      (
        x: number,
        y: number,
        _: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        setModalPosition({top: -haftHeight + pageY + height / 2, left: pageX});
        handleOpenEmoji();
      },
    );
    setIncrement(false);
  };

  const handlePressOut = () => {
    if (increment) {
      handleCloseEmoji();
      if (
        (react.userReact || react.userReact === 0) &&
        react.userReact !== -1
      ) {
        createOrUpdateReact({reactState: null, isCancel: true});
      } else {
        createOrUpdateReact({reactState: 0, isCancel: false, create: true});
      }
    }
    setIncrement(true);
  };

  const handleChooseIcon = (index: number) => {
    setReact({...react, isLoading: true});
    if (react.userReact !== null) {
      createOrUpdateReact({reactState: index, create: false, isCancel: false});
    } else {
      createOrUpdateReact({reactState: index, create: true, isCancel: false});
    }
    setCurrentEmoji(index);
    handleCloseEmoji();
  };

  const toggleModalShare = () => {
    setState(prevState => ({
      ...prevState,
      modalShare: !prevState.modalShare,
    }));
  };

  const handleOpenEmoji = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      modalEmoji: true,
    }));
  }, []);

  const handleCloseEmoji = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      modalEmoji: false,
    }));
  }, []);

  const toggleOptions = useCallback(() => {
    setVisibleOptions(!visibleOptions);
  }, [visibleOptions]);

  const goCommentScreen = useCallback(() => {
    navigation.navigate('SocialMediaStack', {
      screen: 'SocialCommentPostScreen',
      params: {postId: post.id},
    });
  }, [navigation, post.id]);

  const goProfileScreen = useCallback(() => {
    navigation.navigate('SocialProfileScreen', {
      userId: post?.user?.id,
    });
  }, [navigation, post?.user?.id]);

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

          {post?.imageUrls?.length > 0 ? (
            <View>
              {isViewPost ? (
                <ImagesGridView images={post?.imageUrls} />
              ) : (
                <ImagesGridGallery
                  postId={post.id}
                  images={post?.imageUrls}
                  navigation={navigation}
                />
              )}
            </View>
          ) : null}

          <View style={styles.footer}>
            <View style={styles.footerHeader}>
              <Pressable
                onPress={() =>
                  navigation.navigate('SocialMediaStack', {
                    screen: 'SocialListLikeScreen',
                    params: {postId: post.id},
                  })
                }
                style={styles.countReact}>
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
                              return <View key={index} />;
                            }
                            return (
                              <View
                                key={index}
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
                disabled={isPending}
                onLongPress={handlePressIn}
                onPressOut={handlePressOut}
                ref={buttonRef}
                delayLongPress={600}
                style={styles.reactVisible}>
                {react.userReact !== null && react.userReact !== -1 ? (
                  <View style={{marginRight: 5}}>
                    {listEmoji[react.userReact ? react.userReact : 0]?.emoji({
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
                )}
                {react.userReact === null ? (
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
                            react.userReact !== null && react.userReact !== -1
                              ? react.userReact
                              : 0
                          ]?.color,
                      },
                    ]}>
                    {language.t(
                      listEmoji[
                        react.userReact !== null && react.userReact !== -1
                          ? react.userReact
                          : 0
                      ]?.des,
                    )}
                  </Text>
                )}
              </Pressable>
              <TouchableOpacity
                onPress={goCommentScreen}
                style={styles.itemFlex}>
                <Icon
                  style={{marginRight: 5}}
                  color="#65676B"
                  name="chatbox-outline"
                  type="ionicon"
                />
                <Text style={[styles.textButton, {color: '#65676B'}]}>
                  {language.t('comment')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModalShare}
                style={styles.itemFlex}>
                <Icon
                  style={{marginRight: 5}}
                  color="#65676B"
                  name="arrow-redo-outline"
                  type="ionicon"
                />
                <Text style={[styles.textButton, {color: '#65676B'}]}>
                  {language.t('share')}
                </Text>
              </TouchableOpacity>

              {state.modalEmoji && (
                <ModalPopUpEmoji
                  visibleEmoji={state.modalEmoji}
                  handleModalClose={handleCloseEmoji}
                  modalPositionTop={modalPosition.top}
                  modalPositionLeft={modalPosition.left}
                  handleChooseIcon={handleChooseIcon}
                  currentEmoji={currentEmoji}
                  marginBottom={90}
                />
              )}
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
  countReact: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 30,
  },
  itemFlex: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  reactVisible: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingVertical: 5,
  },
});
