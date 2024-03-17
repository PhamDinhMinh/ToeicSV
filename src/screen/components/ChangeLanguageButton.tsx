import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '@/global-style';
import {useTranslation} from 'react-i18next';
import {useLanguageImage} from '@/hooks/useLanguageImage';
import {useLanguageStore} from '@/stores/languageStore';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useTheme} from '@rneui/themed';

const ControlledTooltip = ({
  open,
  onChangeLanguage,
  setOpen = () => {},
  ...props
}: any) => {
  const language = useTranslation();
  const {theme} = useTheme();

  const handlePress = (lang: string) => {
    onChangeLanguage(lang);
    setOpen(false);
  };

  return (
    <Tooltip
      topAdjustment={-(StatusBar.currentHeight ?? 0)}
      placement="bottom"
      isVisible={open}
      closeOnContentInteraction={false}
      backgroundColor="#00000020"
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      contentStyle={{
        width: 160,
        justifyContent: 'space-around',
        padding: 0,
      }}
      tooltipStyle={{
        shadowOffset: {
          x: 1,
          y: 1,
        },
        shadowOpacity: 0.2,
      }}
      content={
        <View>
          <Pressable
            onPress={() => handlePress('vi')}
            style={({pressed}) => ({
              ...styles.tooltipFunction,
              backgroundColor: pressed ? theme.colors.background : 'white',
            })}>
            <View style={{width: 40, aspectRatio: 1.5}}>
              <Image
                source={useLanguageImage('vi')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <Text style={styles.tooltipText}>{language.t('vietnamese')}</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress('en')}
            style={({pressed}) => ({
              ...styles.tooltipFunction,
              backgroundColor: pressed ? theme.colors.background : 'white',
            })}>
            <View style={{width: 40, aspectRatio: 1.5}}>
              <Image
                source={useLanguageImage('en')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <Text style={styles.tooltipText}>{language.t('english')}</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress('ko')}
            style={({pressed}) => ({
              ...styles.tooltipFunction,
              backgroundColor: pressed ? theme.colors.background : 'white',
            })}>
            <View style={{width: 40, aspectRatio: 1.5}}>
              <Image
                source={useLanguageImage('ko')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <Text style={styles.tooltipText}>{language.t('korean')}</Text>
          </Pressable>
        </View>
      }
      {...props}
    />
  );
};

const ChangLanguageButton = ({
  containerStyle,
}: {
  containerStyle: StyleProp<ViewStyle>;
}) => {
  const [open, setOpen] = useState(false);
  const currentLanguage = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);

  return (
    <View style={containerStyle}>
      <ControlledTooltip
        open={open}
        setOpen={setOpen}
        onChangeLanguage={setLanguage}>
        <Pressable
          onPress={() => setOpen(true)}
          style={{width: 40, aspectRatio: 1.5}}>
          <Image
            source={useLanguageImage(currentLanguage)}
            style={{width: '100%', height: '100%'}}
          />
        </Pressable>
      </ControlledTooltip>
    </View>
  );
};

export default ChangLanguageButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  tooltipFunction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tooltipText: {
    ...globalStyles.text13Medium,
    marginLeft: 10,
  },
});
