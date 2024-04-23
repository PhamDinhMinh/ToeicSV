import React from 'react';
import ExamTipScreen from '@/screen/documents/exam-tips/exam-tips.screen';
import VocabularyScreen from '@/screen/documents/vocabulary/vocabulary.screen';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import GrammarDetailScreen from '@/screen/documents/grammars/grammar-detail.screen';
import {IGrammarResponse} from '@/screen/documents/grammars/services/grammar.model';
import {IExamTipsResponse} from '@/screen/documents/exam-tips/services/exam-tips.model';
import ExamTipsDetailScreen from '@/screen/documents/exam-tips/exam-tips.detail';
import GrammarTab from './tab/grammar.tab';

export type TDocumentStackParamList = {
  DocumentScreen: undefined;
  GrammarTab: undefined;
  ExamTipScreen: undefined;
  VocabularyScreen: undefined;
  GrammarDetailScreen: {
    item: IGrammarResponse;
  };
  ExamTipsDetailScreen: {
    item: IExamTipsResponse;
  };
};

const Stack = createStackNavigator<TDocumentStackParamList>();

const DocumentsStack = () => {
  const language = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="GrammarTab"
        component={GrammarTab}
        options={{
          headerTitle: language.t('Ngữ pháp'),
          headerShown: true,
        }}
      />
      {/* <Stack.Screen
        name="GrammarScreen"
        component={GrammarScreen}
        options={{
          headerTitle: language.t('Ngữ pháp'),
          headerShown: true,
        }}
      /> */}
      <Stack.Screen
        name="GrammarDetailScreen"
        component={GrammarDetailScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ExamTipScreen"
        component={ExamTipScreen}
        options={{
          headerTitle: language.t('exam-tips'),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ExamTipsDetailScreen"
        component={ExamTipsDetailScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="VocabularyScreen"
        component={VocabularyScreen}
        options={{
          headerTitle: 'Vocabulary',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default DocumentsStack;
