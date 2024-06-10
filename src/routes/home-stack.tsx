import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PartDetailScreen from '@/screen/home/screens/part-detail.screen';
import {IItemPart} from '@/screen/home/screens/home.screen';
import QuestionDetailScreen from '@/screen/home/screens/question-detail.screen';
import ResultSubmitScreen from '@/screen/home/screens/result-submit.screen';
import ExamListScreen from '@/screen/home/screens/exam-list.screen';
import ExamDetailScreen from '@/screen/home/screens/exam-detail.screen';

export type THomeStackParamList = {
  PartDetailScreen: {
    item: IItemPart;
  };
  QuestionDetailScreen: {
    partId: number;
    maxResultCount?: number;
  };
  ResultSubmitScreen: {
    item?: any;
  };
  ExamListScreen: undefined;
  ExamDetailScreen: {
    idExam: number;
  };
};

const Stack = createStackNavigator<THomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="PartDetailScreen"
        component={PartDetailScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="QuestionDetailScreen"
        component={QuestionDetailScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="ResultSubmitScreen"
        component={ResultSubmitScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="ExamListScreen"
        component={ExamListScreen}
        options={{
          headerShown: true,
          title: 'Tất cả đề thi',
        }}
      />
      <Stack.Screen
        name="ExamDetailScreen"
        component={ExamDetailScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
