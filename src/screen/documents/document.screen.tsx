import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/base';
import globalStyles, {color} from '@/global-style';
import {StackScreenProps} from '@react-navigation/stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TMyTabsParamsList} from '@/routes/my-tabs';
import {TMainStackParamList} from '@/routes/main-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TDocumentStackParamList} from '@/routes/documents-stack';

type TItem = {
  nameIcon: string;
  typeIcon: string;
  colorIcon: string;
  route: string;
  content: string;
};

const ItemDocument = ({item, navigation}: {item: TItem; navigation: any}) => {
  const [backgroundPress, setBackgroundPress] = useState('white');

  return (
    <Pressable
      style={[styles.containerItem, {backgroundColor: backgroundPress}]}
      onPressIn={() => setBackgroundPress('#E0E0E0')}
      onPressOut={() => setBackgroundPress('white')}
      onPress={() => {
        navigation.navigate('DocumentsStack', {
          screen: item?.route,
        });
      }}>
      <Icon
        color={item?.colorIcon}
        name={item?.nameIcon}
        type={item?.typeIcon}
      />
      <Text style={styles.textContent}>{item?.content}</Text>
    </Pressable>
  );
};

type props = CompositeScreenProps<
  BottomTabScreenProps<TMyTabsParamsList, 'Documents'>,
  StackScreenProps<TMainStackParamList, 'MyTab'>
>;

const DocumentScreen = ({navigation}: props) => {
  const itemDocument = [
    {
      nameIcon: 'abc',
      typeIcon: 'material-icon',
      colorIcon: color.grey_800,
      route: 'GrammarScreen',
      content: 'Ngữ pháp',
    },
    {
      nameIcon: 'book',
      typeIcon: 'ionicon',
      colorIcon: color.grey_800,
      route: 'VocabularyScreen',
      content: 'Bộ từ vựng',
    },
    {
      nameIcon: 'lightbulb-auto',
      typeIcon: 'material-community',
      colorIcon: color.grey_800,
      route: 'ExamTipScreen',
      content: 'Tip làm bài',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {itemDocument.map((item, index) => (
          <ItemDocument item={item} key={index} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  containerItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
  },
  textContent: {
    marginLeft: 10,
    ...globalStyles.text16Regular,
  },
});
