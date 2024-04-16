import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';

import globalStyles from '@/global-style';
import {ICommentResponse} from '../services/social-media.model';
import socialMediaService from '../services/social-media.service';
import {useQuery} from '@tanstack/react-query';
import CommentItem from './comment-item';

type TCommentGroup = {
  comment: ICommentResponse;
  setCommentReplay: any;
};
const CommentGroup = (props: TCommentGroup) => {
  const {comment, setCommentReplay} = props;
  return (
    <View style={{width: '100%'}}>
      <CommentItem
        comment={comment}
        setCommentReplay={setCommentReplay}
        disableReply={false}
      />
      {comment.countChildComment > 0 && <ListChildComment comment={comment} />}
    </View>
  );
};

const ListChildComment = ({comment}: {comment: ICommentResponse}) => {
  const [moreView, setMoreView] = useState(false);

  const {data: getAllListChildCommentQuery} = useQuery({
    queryKey: ['get-list-child-comment', comment.id],
    queryFn: () =>
      socialMediaService.getAllComment({
        postId: comment.postId,
        skipCount: 0,
        maxResultCount: 100,
        parentCommentId: comment.id,
      }),
  });

  return (
    <View style={{position: 'relative'}}>
      {!moreView && comment.countChildComment > 1 && (
        <Pressable
          onPress={() => setMoreView(true)}
          style={{
            marginLeft: 80,
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: 20,
          }}>
          <Text style={{...globalStyles.text14Bold, color: 'black'}}>
            Xem {comment.countChildComment} phản hồi khác...
          </Text>
        </Pressable>
      )}
      {(moreView || comment.countChildComment === 1) &&
        getAllListChildCommentQuery?.data?.map(
          (itemComment: ICommentResponse, index: number) => {
            if (index === getAllListChildCommentQuery?.data?.length - 1) {
              return (
                <View style={{marginLeft: 40}} key={index}>
                  <CommentItem
                    comment={itemComment}
                    disableReply={true}
                    itemFinish={true}
                  />
                </View>
              );
            }
            return (
              <View style={{marginLeft: 40}} key={index}>
                <CommentItem comment={itemComment} disableReply={true} />
              </View>
            );
          },
        )}
    </View>
  );
};

export default CommentGroup;
