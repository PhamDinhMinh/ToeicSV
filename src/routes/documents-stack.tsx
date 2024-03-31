import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DocumentScreen from '@/screen/documents/document.screen';

export type TDocumentStackParamList = {
  DocumentScreen: undefined;
};

const Stack = createNativeStackNavigator<TDocumentStackParamList>();

const DocumentsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DocumentScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="DocumentScreen"
        component={DocumentScreen}
        options={{
          title: 'Danh sách dịch vụ nội khu',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default DocumentsStack;
