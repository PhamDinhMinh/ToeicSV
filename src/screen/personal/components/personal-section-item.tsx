import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import globalStyles, {color} from '@/global-style';
import {Icon} from '@rneui/base';
import useAccountStore, {IAccountState} from '@/stores/account.store';
import ModalConfirm from '@/screen/components/modal-confirm/modal-confirm';
import ChangLanguageButton from '@/screen/components/change-language-button';
// import {ETenantTypeConfig} from '@/slices/mobileConfigSlice';
// import {languageKeys} from '@/commons/language/i18next';

const PersonalSectionItem = ({
  item,
  navigation,
}: {
  item: any;
  navigation: any;
}) => {
  const setAccount = useAccountStore(
    (state: IAccountState) => state.setAccount,
  );
  const setTokenAuth = useAccountStore(
    (state: IAccountState) => state.setTokenAuth,
  );
  const [isVisible, setIsVisible] = useState(false);

  const onItemPress = () => {
    if (item?.function) {
      if (item?.key === 'logout') {
        setIsVisible(true);
      }
    } else {
      item.stack
        ? navigation.navigate(item.stack, {
            screen: item.route,
          })
        : navigation.navigate('PersonalStack', {
            screen: item.route,
          });
    }
  };
  const language = useTranslation();

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <Pressable onPress={onItemPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          type={item.typeIcon}
          name={item.nameIcon}
          size={item.size}
          color={color.grey_800}
        />
      </View>
      <Text style={styles.text}>{language.t(item.title)}</Text>
      {item?.key === 'language' && (
        <ChangLanguageButton
          containerStyle={{position: 'absolute', top: 10, right: 10}}
        />
      )}
      <ModalConfirm
        isVisible={isVisible}
        closeModal={closeModal}
        content={language.t('are-you-logout')}
        handlePress={item?.function}
        setTokenAuth={setTokenAuth}
        setAccount={setAccount}
      />
    </Pressable>
  );
};

export default PersonalSectionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: 'relative',
  },
  iconContainer: {
    padding: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 100,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...globalStyles.text16Medium,
    color: '#515151',
    marginLeft: 10,
  },
});
