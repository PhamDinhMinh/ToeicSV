import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {color} from '@/global-style';
import {useTheme} from '@rneui/themed';
import GrammarScreen from '@/screen/documents/grammars/grammars.screen';
import {ETypeGrammar} from '@/screen/documents/grammars/services/grammar.model';

export type TGrammarTabParamList = {
  GrammarBasicScreen: {
    type: number;
  };
  GrammarAdvanceScreen: {
    type: number;
  };
};

const Tab = createMaterialTopTabNavigator<TGrammarTabParamList>();

const GrammarTab = () => {
  const language = useTranslation();

  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.content, {paddingHorizontal: 0}]}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {backgroundColor: theme.colors.primary},
            tabBarStyle: {elevation: 0},
            tabBarScrollEnabled: false,
            lazy: true,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: color.grey_700,
            tabBarLabelStyle: {
              textTransform: 'none',
              fontSize: 16,
              fontWeight: '500',
            },
          }}
          backBehavior="none">
          <Tab.Screen
            options={{
              tabBarLabel: language.t('basic'),
            }}
            name="GrammarBasicScreen"
            component={GrammarScreen}
            initialParams={{type: ETypeGrammar.Basic}}
          />
          <Tab.Screen
            options={{
              tabBarLabel: language.t('advance'),
            }}
            name="GrammarAdvanceScreen"
            component={GrammarScreen}
            initialParams={{type: ETypeGrammar.Advanced}}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default GrammarTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 5,
    flex: 1,
  },
  button: {
    borderRadius: 10,
  },
});
