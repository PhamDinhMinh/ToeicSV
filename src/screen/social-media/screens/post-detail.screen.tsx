import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {memo, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {TSocialMediaStackParamList} from '@/routes/social-media-stack';
import socialMediaService from '../services/social-media.service';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {ICommentResponse, IPostResponse} from '../services/social-media.model';
import SocialPostItem from '../components/social-post-item';
import CommentGroup from '../components/comment-group';
import CommentInput from '../components/comment-input';

type props = StackScreenProps<TSocialMediaStackParamList, 'PostDetailScreen'>;

const PostDetailScreen = ({route, navigation}: props) => {
  const {postId} = route.params;

  const {data: post} = useQuery({
    queryKey: ['post-detail', postId],
    queryFn: () => socialMediaService.getPostById({id: postId}),
    enabled: !!postId,
  });

  const inputRef = useRef();
  const queryClient = useQueryClient();
  const language = useTranslation();

  const [commentReplay, setCommentReplay] = useState<any>();

  const {
    data: getListComment,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['list-post-comment', postId],
    queryFn: () =>
      socialMediaService.getAllComment({
        skipCount: 0,
        maxResultCount: 100,
        postId: postId,
      }),
  });

  const replyComment = (comment: ICommentResponse) => {
    setCommentReplay(comment);
  };

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
      queryClient.refetchQueries({queryKey: ['post-detail', postId]});
    },
  });

  return (
    <KeyboardAvoidingView
      style={{marginTop: 10, flex: 1, backgroundColor: 'white'}}
      keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{flex: 1}}>
        {post?.data && (
          <MainView
            post={post?.data}
            dataProvider={getListComment?.data}
            setCommentReplay={replyComment}
            navigation={navigation}
            isFetching={isFetching}
            refetch={refetch}
          />
        )}
      </View>
      <CommentInput
        sendCommentHandle={sendCommentHandle}
        setCommentReplay={setCommentReplay}
        commentReplay={commentReplay}
        inputRef={inputRef}
        placeHolder={language.t('write-comment-me')}
      />
    </KeyboardAvoidingView>
  );
};

export default PostDetailScreen;

type TMainView = {
  post: IPostResponse;
  dataProvider: any;
  setCommentReplay: any;
  navigation: any;
  refetch: () => void;
  isFetching: boolean;
};
const MainView = memo((props: TMainView) => {
  const {
    post,
    dataProvider,
    setCommentReplay,
    navigation,
    isFetching = false,
    refetch,
  } = props;

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <SocialPostItem
              post={post}
              navigation={navigation}
              isViewPost={true}
            />
          </View>
        }
        renderItem={({item}) => (
          <CommentGroup
            comment={item}
            setCommentReplay={setCommentReplay}
            navigation={navigation}
          />
        )}
        data={dataProvider}
        onEndReachedThreshold={80}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    borderBottomColor: '#EEE',
    borderBottomWidth: 2,
  },
});
