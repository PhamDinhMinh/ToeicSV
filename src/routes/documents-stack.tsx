import React from 'react';
import GrammarScreen from '@/screen/documents/grammars/grammars.screen';
import ExamTipScreen from '@/screen/documents/exam-tips/exam-tips.screen';
import VocabularyScreen from '@/screen/documents/vocabulary/vocabulary.screen';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import GrammarDetailScreen from '@/screen/documents/grammars/grammar-detail.screen';
import {IGrammarResponse} from '@/screen/documents/grammars/services/grammar.model';

export type TDocumentStackParamList = {
  DocumentScreen: undefined;
  GrammarScreen: undefined;
  ExamTipScreen: undefined;
  VocabularyScreen: undefined;
  GrammarDetailScreen: {
    item: IGrammarResponse;
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
        name="GrammarScreen"
        component={GrammarScreen}
        options={{
          headerTitle: language.t('Ngữ pháp'),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ExamTipScreen"
        component={ExamTipScreen}
        options={{
          headerTitle: 'Mẹo làm b',
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
      <Stack.Screen
        name="GrammarDetailScreen"
        component={GrammarDetailScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default DocumentsStack;
