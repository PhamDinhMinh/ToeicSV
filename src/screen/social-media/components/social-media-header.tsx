import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Avatar, Icon} from '@rneui/themed';
import globalStyles, {color} from '@/global-style';
import useAvatarDefault from '@/stores/avatar.store';
import useAccountStore from '@/stores/account.store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('screen');

const SocialMediaHeader = ({navigation}: {navigation: any}) => {
  const avatarDefault = useAvatarDefault(state => state?.avatarDefault);
  const account = useAccountStore(state => state?.account);

  const language = useTranslation();

  const [colorPress, setColorPress] = useState('#FFF');

  const handleColorPress = () => {
    setColorPress('#EEE');
  };

  const handleColorPressOut = () => {
    setColorPress('#FFF');
  };

  const goToProfile = useCallback(() => {
    navigation.navigate('SocialMediaStack', {
      screen: 'SocialProfileScreen',
      params: {userId: account?.id},
    });
  }, [account?.id, navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={[
            styles.row,
            {
              marginBottom: 10,
              borderBottomColor: '#F1F2F8',
              borderBottomWidth: 1,
              paddingBottom: 5,
            },
          ]}>
          <Icon
            name="search"
            type="ionicon"
            color={color.grey_700}
            containerStyle={[
              styles.iconHeader,
              {
                marginLeft: 'auto',
              },
            ]}
          />
          <Icon
            name="notifications"
            type="ionicon"
            color={color.grey_700}
            containerStyle={[
              styles.iconHeader,
              {
                marginLeft: 10,
              },
            ]}
          />
        </View>
        <View style={styles.row}>
          <Pressable style={{alignSelf: 'flex-start'}} onPress={goToProfile}>
            <Avatar
              source={{
                uri: account?.imageUrl ?? avatarDefault,
              }}
              size={40}
              rounded
            />
          </Pressable>
          <Pressable
            onPressIn={handleColorPress}
            onPressOut={handleColorPressOut}
            style={[styles.inputContainer, {backgroundColor: colorPress}]}>
            <Text style={[styles.input]}>{language.t('what-on-ur-mind')}</Text>
          </Pressable>
          <TouchableOpacity
          // onPress={goToCUPost}
          >
            <Icon color={'#00A400'} name="image" type="ionicon" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SocialMediaHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    backgroundColor: 'white',
    borderBottomColor: '#F1F2F8',
    borderColor: '#eee',
    borderBottomWidth: 1,
    borderRadius: width > 440 ? 10 : 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  inputContainer: {
    flex: 1,
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    // backgroundColor: '#F0F2F5',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  input: {
    fontSize: 15,
    color: '#000',
    paddingVertical: 7,
    textAlignVertical: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconHeader: {
    backgroundColor: '#F1F2F8',
    padding: 5,
    aspectRatio: 1,
    borderRadius: 20,
  },

  text: {
    ...globalStyles.text15Medium,
    color: color.grey_600,
    marginLeft: 8,
  },

  containerCreateGroup: {
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    color: 'black',
    paddingTop: 15,
    maxHeight: 500,
  },

  itemCreate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  iconCreateGroup: {
    backgroundColor: '#E4E6EB',
    borderRadius: 20,
    padding: 8,
    marginHorizontal: 10,
  },

  titleCreateGroup: {
    ...globalStyles.text17Bold,
    color: 'black',
  },

  contentContainer: {
    // flex: 1,
    alignItems: 'center',
  },
});
