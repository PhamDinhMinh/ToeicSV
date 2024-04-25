import {
  Platform,
  Pressable,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TMyTabsParamsList} from '@/routes/my-tabs';
import {TMainStackParamList} from '@/routes/main-stack';
import useListSetting from '../hooks/list-setting.hook';
import {Avatar} from '@rneui/themed';
import useAvatarDefault from '@/stores/avatar.store';
import useAccountStore, {IAccountState} from '@/stores/account.store';
import globalStyles from '@/global-style';
import PersonalSectionLabel from '../components/personal-section-label';
import PersonalSectionItem from '../components/personal-section-item';

type props = CompositeScreenProps<
  BottomTabScreenProps<TMyTabsParamsList, 'Settings'>,
  StackScreenProps<TMainStackParamList, 'MyTab'>
>;

const SettingScreen = ({navigation}: props) => {
  const avatarDefault = useAvatarDefault((state: any) => state?.avatarDefault);
  const account = useAccountStore((state: IAccountState) => state?.account);
  const listSetting = useListSetting();

  const renderItem = useCallback(
    ({item}: any) => (
      <PersonalSectionItem item={item} navigation={navigation} />
    ),
    [navigation],
  );

  const goToPersonalScreen = useCallback(() => {
    navigation.navigate('SettingStack', {
      screen: 'PersonalScreen',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable style={styles.headerInfo} onPress={goToPersonalScreen}>
          <Avatar
            source={{
              uri: account?.imageUrl ?? avatarDefault,
            }}
            size={50}
            rounded
          />
          <View style={styles.contentHeader}>
            <Text style={styles.textName}>{account?.name}</Text>
            <Text>{account?.userName}</Text>
          </View>
        </Pressable>
      </SafeAreaView>
      <SectionList
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        //@ts-ignore
        sections={listSetting}
        renderItem={renderItem}
        renderSectionHeader={({section: {label}}) => (
          <PersonalSectionLabel {...{label}} />
        )}
        contentContainerStyle={styles.contentContainer}
        renderSectionFooter={() => <View style={styles.sectionFooter} />}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  safeArea: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginBottom: 5,
  },
  headerInfo: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  contentHeader: {
    marginLeft: 10,
  },
  contentContainer: {
    // paddingBottom: 100,
    backgroundColor: 'white',
  },
  textName: {
    ...globalStyles.text17Bold,
    fontSize: 18,
    color: 'black',
  },
  sectionFooter: {
    height: 5,
    backgroundColor: '#F1F2F8',
  },
});
