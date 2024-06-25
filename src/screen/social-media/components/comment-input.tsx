import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Icon} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import globalStyles from '@/global-style';

type TCommentInput = {
  sendCommentHandle: (data: {comment: string}) => void;
  commentReplay: any | null | undefined;
  setCommentReplay?: any;
  inputRef: any;
  placeHolder: string;
};

const CommentInput = (props: TCommentInput) => {
  const {
    sendCommentHandle,
    commentReplay,
    setCommentReplay,
    inputRef,
    placeHolder,
  } = props;

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      comment: '',
    },
  });

  useEffect(() => {
    const focusTextInput = () => {
      if (inputRef?.current) {
        inputRef?.current.focus();
      }
    };
    const timer = setTimeout(focusTextInput, 200);
    return () => clearTimeout(timer);
  }, [inputRef]);

  const onSubmit = (data: any) => {
    sendCommentHandle(data);
    reset();
  };

  const language = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      {commentReplay && (
        <View style={styles.textReply}>
          <View style={{flexDirection: 'row'}}>
            <Text>{language.t('reply')} </Text>
            <Text style={[styles.textUserRep, {...globalStyles.text15Bold}]}>
              {commentReplay?.user?.name?.replace(/^\s+/, '')}
            </Text>
          </View>
          <Button
            type="clear"
            title="Huỷ"
            buttonStyle={{padding: 0, backgroundColor: '#FFF'}}
            titleStyle={{color: '#65676B'}}
            // containerStyle={{marginLeft: 'auto'}}
            onPress={() => {
              setCommentReplay(null);
            }}
          />
        </View>
      )}
      <Controller
        control={control}
        name="comment"
        render={({field: {value, onChange}}) => (
          <View
            style={{
              padding: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              ref={inputRef}
              onChangeText={onChange}
              multiline={true}
              style={{
                paddingBottom: Platform.OS === 'android' ? 5 : 10,
                paddingTop: Platform.OS === 'android' ? 5 : 10,
                textAlignVertical: 'center',
                paddingHorizontal: 15,
                backgroundColor: '#f0f0f0',
                borderRadius: 20,
                flex: 1,
                fontSize: 16,
                maxHeight: 100,
              }}
              value={value}
              placeholder={placeHolder}
            />
            <Icon
              onPress={handleSubmit(onSubmit)}
              disabled={value.length === 0}
              disabledStyle={{backgroundColor: 'white'}}
              color={value.length > 0 ? '#339FD9' : '#c4c4c4'}
              name="send"
              type="ionicon"
              size={28}
              containerStyle={{marginLeft: 16}}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },

  textReply: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  textUserRep: {
    color: 'black',
  },

  buttonCancel: {
    color: '#56575B',
  },
});

export default CommentInput;
