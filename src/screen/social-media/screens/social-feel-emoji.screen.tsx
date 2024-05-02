import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useId, useState} from 'react';
import {Icon} from '@rneui/themed';
import globalStyles from '@/global-style';
import FeelEmotions from '../components/feeling-emotions/feeling-emotions';
import {StackScreenProps} from '@react-navigation/stack';
import {TSocialMediaStackParamList} from '@/routes/social-media-stack';
import {useTranslation} from 'react-i18next';

type props = StackScreenProps<
  TSocialMediaStackParamList,
  'SocialFeelEmojiScreen'
>;

const SocialFeelEmojiScreen = ({navigation, route}: props) => {
  const {post} = route.params;

  const language = useTranslation();
  const uid = useId();

  const [value, setValue] = useState('');
  const [data, setData] = useState(FeelEmotions);

  const handlePress = (text: string) => {
    setValue(text);
    setData(FeelEmotions);
    const Timer = setTimeout(() => {
      const searchData = FeelEmotions.filter(item =>
        item.des.toLowerCase().includes(text.toLowerCase()),
      );
      setData(searchData);
    }, 800);
    return () => {
      clearTimeout(Timer);
    };
  };

  const handlePressChoose = (index: number | undefined) => {
    navigation.navigate('SocialCUPostScreen', {
      indexEmoji: index,
      post: post,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchGroup}>
        <Icon name="search" type="ionicon" color="#ccc" />
        <TextInput
          value={value}
          onChangeText={handlePress}
          placeholder={language.t('hello')}
          style={styles.inputSearch}
        />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.contentEmoji}>
          {data.map((itemEmoji, index) => {
            return (
              <Pressable
                key={uid + index}
                onPress={() => handlePressChoose(itemEmoji.id - 1)}
                style={[
                  styles.itemEmoji,
                  index % 2 === 0
                    ? {
                        borderRightColor: '#CCC',
                        borderRightWidth: 1,
                      }
                    : {},
                  index === data.length - 1 || index === data.length - 2
                    ? {borderBottomWidth: 1}
                    : {},
                ]}>
                <Image
                  style={styles.iconItemEmoji}
                  source={{uri: itemEmoji.icon}}
                />
                <Text style={styles.textDes}>{language.t(itemEmoji.des)}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SocialFeelEmojiScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  searchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: 10,
  },
  inputSearch: {
    paddingVertical: 10,
    flex: 1,
    ...globalStyles.text15Medium,
    color: 'black',
  },
  content: {},
  contentEmoji: {
    height: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemEmoji: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    borderTopWidth: 1,
    borderBlockColor: '#CCC',
    paddingVertical: 10,
  },
  iconItemEmoji: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },
  textDes: {
    ...globalStyles.text15Medium,
    color: 'black',
  },
});
