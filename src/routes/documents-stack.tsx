import React from 'react';
import GrammarScreen from '@/screen/documents/grammars/grammars.screen';
import ExamTipScreen from '@/screen/documents/exam-tips/exam-tips.screen';
import VocabularyScreen from '@/screen/documents/vocabulary/vocabulary.screen';
import {createStackNavigator} from '@react-navigation/stack';

export type TDocumentStackParamList = {
  DocumentScreen: undefined;
  GrammarScreen: undefined;
  ExamTipScreen: undefined;
  VocabularyScreen: undefined;
};

const Stack = createStackNavigator<TDocumentStackParamList>();

const DocumentsStack = () => {
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
          headerTitle: 'Grammar',
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
    </Stack.Navigator>
  );
};

export default DocumentsStack;
