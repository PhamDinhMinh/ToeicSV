import React, {useRef, useState, useMemo, useCallback} from 'react';
import {TSocialMediaStackParamList} from '@/routes/social-media-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import globalStyles, {color} from '@/global-style';
import socialMediaService from '../services/social-media.service';
import {ICommentResponse} from '../services/social-media.model';
import CommentInput from '../components/comment-input';
import CommentGroup from '../components/comment-group';

const {width} = Dimensions.get('screen');

type props = StackScreenProps<
  TSocialMediaStackParamList,
  'SocialCommentPostScreen'
>;

const SocialCommentPostScreen = ({route}: props) => {
  const {postId} = route.params;
  const language = useTranslation();
  const queryClient = useQueryClient();

  const [commentReplay, setCommentReplay] = useState<
    ICommentResponse | undefined | null
  >(undefined);

  const {
    data: getListComment,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['list-post-comment', postId],
    queryFn: () =>
      socialMediaService.getAllComment({
        skipCount: 0,
        maxResultCount: 10,
        postId: postId,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage?.data?.length <
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 10,
            postId: postId,
          }
        : undefined;
    },
    initialPageParam: {skipCount: 0, maxResultCount: 10, postId: postId},
  });

  const onRefresh = () => {
    refetch();
  };

  const dataProvider = useMemo(() => {
    return getListComment?.pages.map(page => page?.data).flat() ?? [];
  }, [getListComment?.pages]);

  const onEndReached = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const replyComment = (comment: ICommentResponse) => {
    inputComment?.current?.focus();
    setCommentReplay(comment);
  };

  const renderItem = useCallback(
    ({item, index}: {item: ICommentResponse; index: number}) => {
      return (
        <View style={{width: '100%'}} key={index}>
          <CommentGroup comment={item} setCommentReplay={replyComment} />
        </View>
      );
    },
    [],
  );

  const {mutate: sendCommentHandle} = useMutation({
    mutationFn: (params: {comment: string}) => {
      let payload = commentReplay
        ? {
            comment: params?.comment,
            postId: postId,
            parentCommentId: commentReplay.id,
          }
        : {
            comment: params?.comment,
            postId: postId,
          };
      return socialMediaService.createComment(payload);
    },
    onSuccess: () => {
      setCommentReplay(null);
      queryClient.refetchQueries({
        queryKey: ['list-post-comment', postId],
      });
      queryClient.refetchQueries({
        queryKey: ['get-list-child-comment', postId],
      });
      queryClient.refetchQueries({queryKey: ['list-post']});
    },
  });

  const inputComment = useRef<any>(null);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{flex: 1}}>
        <FlatList
          maxToRenderPerBatch={20}
          data={dataProvider}
          renderItem={renderItem}
          onEndReached={onEndReached}
          refreshing={isLoading}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            isLoading ? undefined : (
              <Text
                style={[
                  styles.text,
                  {
                    textAlign: 'center',
                    marginTop: '50%',
                  },
                ]}>
                {language.t('not-comments')}
              </Text>
            )
          }
        />
      </View>

      <CommentInput
        inputRef={inputComment}
        sendCommentHandle={sendCommentHandle}
        setCommentReplay={setCommentReplay}
        commentReplay={commentReplay}
        placeHolder={language.t('writeComment')}
      />
    </KeyboardAvoidingView>
  );
};

export default SocialCommentPostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },

  textTitle: {
    ...globalStyles.text16Regular,
    color: color.grey_600,
    textAlign: 'center',
    width: '100%',
    marginTop: '50%',
    position: 'absolute',
  },

  text: {
    ...globalStyles.text16Regular,
    color: color.grey_600,
  },
});
