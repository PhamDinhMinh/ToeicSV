import moment from 'moment';
import React, {memo, useState, useRef} from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {Avatar, Divider} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {ICommentResponse} from '../services/social-media.model';
import globalStyles, {color} from '@/global-style';
import useAccountStore from '@/stores/account.store';
import useAvatarDefault from '@/stores/avatar.store';
import listEmoji from './react/list-emoji';
import Modal from 'react-native-modal';
import ItemActionComment from './item-action-comment';
import ModalPopUpEmoji from './react/emoji-modal-popup';
import ActionDeleteModal from '@/screen/components/action-delete-modal';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import socialMediaService from '../services/social-media.service';
import Toast from 'react-native-toast-message';

const haftHeight = Dimensions.get('screen').height / 2;

type TCommentItem = {
  comment: ICommentResponse;
  setCommentReplay?: any;
  disableReply: boolean;
  itemFinish?: boolean;
};

type TReact = {
  reactState?: number | null;
  countReact: number;
  isLoading: boolean;
};

const CommentItem = (props: TCommentItem) => {
  const {comment, setCommentReplay, disableReply, itemFinish} = props;
  const userInformation = useAccountStore(state => state?.account);
  const avatarDefault = useAvatarDefault(state => state?.avatarDefault);
  const queryClient = useQueryClient();

  const [_openModalEdit, _setOpenModalEdit] = useState(false);

  const [react, setReact] = useState<TReact>({
    reactState: comment.userReact ?? null,
    countReact: comment.countReact ?? 0,
    isLoading: false,
  });

  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
  const [modalConfirm, setModalConfirm] = useState(false);
  const [showModalEmoji, setShowModalEmoji] = useState(false);
  const [increment, setIncrement] = useState(true);
  const buttonRef = useRef<any>(null);

  const [colorPress, setColorPress] = useState('#F1F2F8');
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const handleCloseEmoji = () => {
    setShowModalEmoji(false);
  };

  //   const {mutate: createOrUpdatePostReact} = useMutation({
  //     mutationFn: (params: {
  //       reactState?: number | null;
  //       isCancel?: boolean;
  //       create?: boolean;
  //     }) => {
  //       type TPayload = {
  //         reactState?: number | null;
  //         commentId?: number;
  //         postId?: number;
  //         isCancel?: boolean;
  //         creatorUserId: number;
  //         creatorTenantId: number | null;
  //       };
  //       const payload: TPayload = {
  //         commentId: comment.id,
  //         reactState: params.reactState,
  //         isCancel: params.isCancel,
  //         creatorUserId: comment.user.id,
  //         creatorTenantId: comment?.user?.tenantId,
  //       };
  //       return SocialPostApi.createOrUpdatePostReactQuery(payload);
  //     },
  //     onSuccess: (_, params) => {
  //       params.isCancel
  //         ? setReact({
  //             reactState: params.reactState,
  //             countReact: react.countReact - 1,
  //             isLoading: false,
  //           })
  //         : params.create
  //         ? setReact({
  //             reactState: params.reactState,
  //             countReact: react.countReact + 1,
  //             isLoading: false,
  //           })
  //         : setReact({
  //             reactState: params.reactState,
  //             countReact: react.countReact,
  //             isLoading: false,
  //           });
  //     },
  //   });

  const handleOnLongPress = () => {
    buttonRef.current.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        setModalPosition({top: -haftHeight + pageY + height + 10, left: 30});
        setShowModalEmoji(true);
      },
    );
    setIncrement(false);
  };

  const handlePressOut = async () => {
    // if (increment) {
    //   setShowModalEmoji(false);
    //   if (react.reactState !== null && react.reactState !== -1) {
    //     createOrUpdatePostReact({reactState: null, isCancel: true});
    //   } else {
    //     createOrUpdatePostReact({reactState: 0, isCancel: false, create: true});
    //   }
    // }
    // setIncrement(true);
  };

  const handleChooseIcon = (index: number) => {
    // setReact({...react, isLoading: true});
    // if (react.reactState !== null) {
    //   createOrUpdatePostReact({reactState: index, create: false});
    // } else {
    //   createOrUpdatePostReact({reactState: index, create: true});
    // }
    // setShowModalEmoji(false);
  };

  const handleEdit = () => {
    setModalEdit(true);
  };

  const handlePress = () => {
    setVisibleModal(true);
    setColorPress('#ccc');
  };

  const handleModalClose = () => {
    setVisibleModal(false);
    setColorPress('#F1F2F8');
  };

  const {mutate: deleteComment, isPending: isPendingDelete} = useMutation({
    mutationFn: () => socialMediaService.deleteComment({id: comment.id}),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: language.t('delete-comment-success'),
        text1Style: {fontSize: 16, fontWeight: '400'},
        topOffset: 80,
      });
      queryClient.refetchQueries({
        queryKey: ['list-post-comment', comment?.postId],
      });
      queryClient.refetchQueries({
        queryKey: ['get-list-child-comment', comment?.postId],
      });
      queryClient.refetchQueries({queryKey: ['list-post']});
    },
    onError: (err: any) => {
      return Toast.show({
        type: 'error',
        text1: err?.data,
        text1Style: {fontSize: 16, fontWeight: '400'},
        topOffset: 80,
      });
    },
  });

  const handleConfirmDeleteComment = () => {
    console.log('hahah');
    setTimeout(() => setModalConfirm(true), 500);
  };

  const language = useTranslation();

  return comment != null ? (
    <KeyboardAvoidingView>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          paddingHorizontal: 10,
          position: 'relative',
        }}>
        <View>
          <Avatar
            rounded
            size={40}
            source={{
              uri: comment?.user?.imageUrl ?? avatarDefault,
            }}
          />
          {comment?.countChildComment > 0 &&
            comment?.parentCommentId === null && (
              <View
                style={{
                  position: 'absolute',
                  bottom: -30,
                  left: 20,
                  width: 40,
                  height: '100%',
                  borderBottomColor: color.grey_300,
                  borderBottomWidth: 2,
                  borderLeftColor: color.grey_300,
                  borderLeftWidth: 2,
                  borderBottomLeftRadius: 10,
                  zIndex: -1,
                }}
              />
            )}
          {!itemFinish && comment?.parentCommentId !== null && (
            <>
              <View
                style={{
                  position: 'absolute',
                  bottom: -30,
                  left: -20,
                  width: 40,
                  height: '100%',
                  borderBottomColor: color.grey_300,
                  borderBottomWidth: 2,
                  borderLeftColor: color.grey_300,
                  borderLeftWidth: 2,
                  borderBottomLeftRadius: 10,
                  zIndex: -1,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 11,
                  left: -20,
                  width: 80,
                  borderLeftColor: color.grey_300,
                  borderLeftWidth: 2,
                  height: 20,
                  zIndex: -1,
                }}
              />
            </>
          )}
        </View>

        <View
          style={{
            flex: comment?.comment?.length >= 35 ? 1 : 0,
          }}>
          <View
            style={{
              alignSelf: comment?.comment?.length >= 35 ? 'auto' : 'flex-start',
            }}>
            <Pressable
              onLongPress={handlePress}
              style={{
                paddingVertical: 2,
                paddingBottom: 5,
                paddingRight: 10,
                paddingLeft: 13,
                borderRadius: 15,
                marginLeft: 10,
                backgroundColor: colorPress,
              }}>
              <View style={{}}>
                <Text style={styles.nameComment}>
                  {comment?.user?.name?.replace(/^\s+/, '')}
                </Text>
              </View>
              <View style={styles.groupComment}>
                <Text style={[styles.text]}>{comment.comment}</Text>
              </View>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 24,
              }}>
              <View style={{marginRight: 10}}>
                <Text style={{fontWeight: '400', color: '#8c8c8c'}}>
                  {moment(comment.creationTime).fromNow().split(' ')[0] +
                    ' ' +
                    moment(comment.creationTime).fromNow().split(' ')[1]}
                </Text>
              </View>

              <View style={{marginRight: 10}}>
                <Pressable
                  onLongPress={handleOnLongPress}
                  onPressOut={handlePressOut}
                  ref={buttonRef}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color:
                        react.reactState && react.reactState !== -1
                          ? listEmoji[react.reactState]?.color
                          : '#8c8c8c',
                    }}>
                    {react.reactState && react.reactState !== -1
                      ? language.t(listEmoji[react.reactState]?.des)
                      : language.t('like')}
                  </Text>
                </Pressable>
              </View>

              {!disableReply && (
                <Pressable
                  onPress={() => {
                    setCommentReplay(comment);
                  }}
                  style={{marginRight: 0}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#8c8c8c',
                      paddingHorizontal: 5,
                      marginRight: comment?.comment?.length >= 25 ? 0 : 10,
                      // paddingVertical: Platform.OS === 'android' ? 0 : 5,
                    }}>
                    {language.t('reply')}
                  </Text>
                </Pressable>
              )}
            </View>

            <View>
              {react.countReact > 0 ? (
                <Pressable
                  // onPress={() =>
                  //   navigation.navigate('SocialListReactScreen', {
                  //     postId: comment.postId,
                  //     commentId: comment.id,
                  //   })
                  // }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{marginRight: 4}}>{react.countReact}</Text>
                  {listEmoji[0]?.emoji({height: 16, width: 16})}
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>
      </View>

      <ModalPopUpEmoji
        visibleEmoji={showModalEmoji}
        currentEmoji={react.reactState}
        handleChooseIcon={handleChooseIcon}
        handleModalClose={handleCloseEmoji}
        modalPositionTop={modalPosition.top}
        modalPositionLeft={modalPosition.left}
        marginBottom={120}
      />

      <Modal
        isVisible={visibleModal}
        onBackdropPress={handleModalClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection={'down'}
        onSwipeComplete={handleModalClose}
        useNativeDriverForBackdrop={true}
        swipeThreshold={60}
        propagateSwipe={true}
        backdropColor="#000"
        backdropOpacity={0.25}
        style={{padding: 0, margin: 0}}>
        <SafeAreaView
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#FFF',
            width: '100%',
          }}>
          <View>
            <View style={{alignItems: 'center', paddingVertical: 10}}>
              <Divider
                inset={true}
                insetType="middle"
                style={{
                  width: 60,
                  borderRadius: 8,
                }}
                color={color.grey_400}
                width={4}
              />
            </View>
            <View style={styles.groupIconEmoji}>
              {listEmoji.map((itemEmoji, index) => {
                return (
                  <Pressable
                    key={index}
                    style={styles.itemEmoji}
                    onPress={() => {
                      handleChooseIcon(index);
                      handleModalClose();
                    }}>
                    {itemEmoji.emoji({width: 35, height: 35})}
                  </Pressable>
                );
              })}
            </View>
            <Text style={{textAlign: 'center'}}>
              {language.t('reaction-icon')}
            </Text>
          </View>
          {comment.creatorUserId === userInformation?.id && (
            <ItemActionComment
              contentDes={language.t('edit-comment')}
              nameIcon="edit"
              typeIcon="font-awesome"
              comment={comment}
              handle={handleEdit}
              handleModalClose={handleModalClose}
            />
          )}
          {!disableReply && (
            <ItemActionComment
              contentDes={language.t('reply')}
              nameIcon="chatbox-outline"
              typeIcon="ionicon"
              comment={comment}
              handle={setCommentReplay}
              handleModalClose={handleModalClose}
            />
          )}
          <ItemActionComment
            contentDes={language.t('copy-comment')}
            nameIcon="copy-outline"
            comment={comment}
            handleModalClose={handleModalClose}
            typeIcon="ionicon"
          />
          {comment.creatorUserId === userInformation?.id && (
            <ItemActionComment
              contentDes={language.t('delete-comment')}
              nameIcon="delete"
              typeIcon="feather"
              comment={comment}
              handle={handleConfirmDeleteComment}
              handleModalClose={handleModalClose}
            />
          )}
        </SafeAreaView>
      </Modal>

      <ActionDeleteModal
        modalConfirm={modalConfirm}
        handle={deleteComment}
        setModalConfirm={setModalConfirm}
        content={language.t('confirm-delete')}
        isPending={isPendingDelete}
      />

      {/* <CommentEditor
        modalEdit={modalEdit}
        setModalEdit={setModalEdit}
        commentItem={comment}
      />  */}
    </KeyboardAvoidingView>
  ) : null;
};

export default memo(CommentItem);

const styles = StyleSheet.create({
  textName: {
    ...globalStyles.text17Bold,
    color: color.grey_500,
    fontSize: 18,
  },

  text: {
    ...globalStyles.text14Regular,
    color: 'black',
    paddingRight: 15,
  },

  tooltip: {
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
  },

  tooltipButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  tooltipContent: {
    minWidth: 140,
    justifyContent: 'space-around',
    padding: 0,
  },

  nameComment: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },

  groupComment: {
    borderRadius: 10,
  },

  groupIconEmoji: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },

  itemEmoji: {
    padding: 10,
  },

  textButton: {
    ...globalStyles.text16Regular,
    color: 'black',
  },
});
