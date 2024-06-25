import {Platform, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import ReactNativeModal from 'react-native-modal';
import {Controller, useForm} from 'react-hook-form';
import {Avatar, Button} from '@rneui/themed';
import {Text} from 'react-native';
import {ICommentResponse} from '../services/social-media.model';
import useAccountStore from '@/stores/account.store';
import globalStyles, {color} from '@/global-style';
import socialMediaService from '../services/social-media.service';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Loading from '@/screen/components/loading/loading';

type TCommentEditor = {
  commentItem: ICommentResponse;
  modalEdit: boolean;
  setModalEdit: any;
};
const CommentEditor = (props: TCommentEditor) => {
  const {commentItem, modalEdit, setModalEdit} = props;

  const userInformation = useAccountStore(state => state?.account);
  const queryClient = useQueryClient();

  const {control, setValue, handleSubmit} = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const inputRef = useRef<any>();
  useEffect(() => {
    setTimeout(() => {
      if (modalEdit) {
        inputRef.current?.focus();
      }
    }, 100);
  }, [modalEdit]);

  useEffect(() => {
    setValue('comment', commentItem.comment);
  }, [commentItem.comment, setValue]);

  const {mutate: updateComment, isPending} = useMutation({
    mutationFn: (data: any) =>
      socialMediaService.updateComment({
        id: commentItem.id,
        comment: data.comment,
      }),
    onSuccess: () => {
      setModalEdit(false);
      Toast.show({
        type: 'success',
        text1: 'Chỉnh sửa thành công',
        text1Style: {fontSize: 16, fontWeight: '400'},
        topOffset: 80,
        visibilityTime: 400,
      });
      queryClient.refetchQueries({
        queryKey: ['list-post-comment', commentItem?.postId],
      });
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

  const onSubmit = async (data: any) => {
    updateComment(data);
  };

  return (
    <ReactNativeModal
      useNativeDriverForBackdrop={true}
      style={{margin: 0, justifyContent: 'flex-end'}}
      backdropOpacity={0.2}
      isVisible={modalEdit}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={'down'}
      onBackdropPress={() => setModalEdit(false)}>
      <View style={styles.contentContainer}>
        <Avatar size={50} rounded source={{uri: userInformation?.imageUrl}} />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{...globalStyles.text16Bold, color: 'black'}}>
            {userInformation?.name}
          </Text>
          <Controller
            control={control}
            name="comment"
            render={({field: {value, onChange}}) => (
              <TextInput
                ref={inputRef}
                value={value}
                onChangeText={onChange}
                multiline
                style={styles.input}
              />
            )}
          />
          <View style={styles.buttonGroup}>
            <Button
              onPress={() => setModalEdit(false)}
              title="Huỷ"
              type="outline"
              buttonStyle={styles.button}
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              title="Gửi"
              buttonStyle={[
                styles.button,
                {backgroundColor: color.green_base_500},
              ]}
            />
          </View>
        </View>
      </View>
      {isPending && <Loading />}
    </ReactNativeModal>
  );
};

export default CommentEditor;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    height: Platform.OS === 'android' ? '60%' : '65%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    borderColor: '#F1F2F8',
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    height: 100,
    marginTop: 5,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
});
