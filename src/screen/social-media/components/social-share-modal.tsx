import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {memo} from 'react';
import Modal from 'react-native-modal';
import {Avatar} from '@rneui/themed';
import globalStyles from '@/global-style';
import {Button} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import useAvatarDefault from '@/stores/avatar.store';
import useAccountStore from '@/stores/account.store';
import {SafeAreaView} from 'react-native';

type TSocialSharePost = {
  modalShare: boolean;
  handleCloseModalShare: () => void;
  goToProfile: () => void;
  postId: number;
};

const SocialSharePost = (props: TSocialSharePost) => {
  const {modalShare, handleCloseModalShare, goToProfile} = props;
  const avatarDefault = useAvatarDefault(state => state?.avatarDefault);
  const userInformation = useAccountStore(state => state?.account);

  const language = useTranslation();

  const {control, handleSubmit} = useForm({
    defaultValues: {
      contentShare: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Modal
      isVisible={modalShare}
      onBackdropPress={handleCloseModalShare}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor="#000"
      backdropOpacity={0.25}
      style={{padding: 0, margin: 0}}>
      <KeyboardAvoidingView
        style={styles.containerShare}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView>
          <View style={styles.headerShare}>
            <Avatar
              onPress={goToProfile}
              rounded
              size={50}
              source={{
                uri: userInformation?.imageUrl ?? avatarDefault,
              }}
            />
            <Text
              onPress={goToProfile}
              style={[styles.textName, {marginLeft: 10}]}>
              {userInformation?.name?.replace(/^\s+/, '')}
            </Text>
          </View>
          <View style={styles.groupTextInput}>
            <View style={{minHeight: 90, maxHeight: 200}}>
              <Controller
                control={control}
                name="contentShare"
                render={({field: {value, onChange}}) => (
                  <TextInput
                    multiline
                    value={value}
                    placeholder={language.t('speak-content')}
                    onChangeText={onChange}
                    style={styles.textInput}
                    inputAccessoryViewID="share-input"
                  />
                )}
              />
            </View>
            <Button
              containerStyle={{
                borderRadius: 10,
                overflow: 'hidden',
                alignSelf: 'flex-end',
                marginBottom: 20,
              }}
              buttonStyle={{
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 8,
                paddingVertical: 5,
              }}
              type="solid"
              title={'Chia sẻ ngay'}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default memo(SocialSharePost);

const styles = StyleSheet.create({
  containerShare: {
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerShare: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginRight: 5,
    marginVertical: 10,
  },
  textName: {
    ...globalStyles.text14Bold,
    color: 'black',
  },
  groupTextInput: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  textInput: {
    ...globalStyles.text17Medium,
  },
});
