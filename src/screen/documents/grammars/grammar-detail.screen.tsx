import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {TDocumentStackParamList} from '@/routes/documents-stack';
import RenderHTML from 'react-native-render-html';
import globalStyles, {color} from '@/global-style';
import {Icon} from '@rneui/themed';
import grammarService from './services/grammar.service';
import Toast from 'react-native-toast-message';
import {useMutation, useQueryClient} from '@tanstack/react-query';

type props = StackScreenProps<TDocumentStackParamList, 'GrammarDetailScreen'>;

const GrammarDetailScreen = ({route, navigation}: props) => {
  const {item} = route.params;
  const {width} = useWindowDimensions();
  const [watched, setWatched] = useState(item?.isWatched);

  const queryClient = useQueryClient();

  const {mutate: updateWatch, isPending} = useMutation({
    mutationFn: (params: any) => grammarService.updateWatch(params),
    onError: (err: any) => {
      return Toast.show({
        type: 'error',
        text1: err?.data,
        topOffset: 80,
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['list-grammar'],
      });
    },
  });

  const renderRight = useCallback(() => {
    return (
      <Pressable
        disabled={isPending}
        onPress={() => {
          updateWatch({id: item?.id, isWatched: !item?.isWatched});
          setWatched(!watched);
        }}>
        {!watched ? (
          <Icon
            name="circle"
            type="entypo"
            color="black"
            containerStyle={{marginRight: 16}}
            size={24}
          />
        ) : (
          <Icon
            name="checkmark-circle-sharp"
            type="ionicon"
            color={color.green_400}
            containerStyle={{marginRight: 16}}
            size={24}
          />
        )}
      </Pressable>
    );
  }, [isPending, item?.id, item?.isWatched, updateWatch, watched]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderRight,
      headerTitleAlign: 'center',
      title: item?.title,
      headerStyle: {},
    });
  }, [item?.title, navigation, renderRight]);

  return (
    <ScrollView style={styles.container}>
      <RenderHTML
        source={{
          html: item?.content,
        }}
        tagsStyles={{body: styles.textContent}}
        contentWidth={width}
      />
      {/* <Text> {item?.content}</Text> */}
    </ScrollView>
  );
};

export default GrammarDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  textContent: {
    ...globalStyles.text16Regular,
    color: 'black',
  },
});
