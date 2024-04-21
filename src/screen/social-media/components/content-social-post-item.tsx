import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyles from '@/global-style';
import translate from 'translate-google-api';
import Clipboard from '@react-native-clipboard/clipboard';
import LanguageDetect from 'languagedetect';
import {useToast} from 'react-native-toast-notifications';
import {IPostResponse} from '../services/social-media.model';
import {useLanguageStore} from '@/stores/language.store';

type TContentSocialPostItem = {
  post: IPostResponse;
};

const ContentSocialPostItem = (props: TContentSocialPostItem) => {
  const {post} = props;
  const currentLanguage = useLanguageStore(state => state.language);

  const [textView, setTextView] = useState({
    stateLike: null,
    numberOfLines: 5,
    viewMore: false,
    fullText: 0,
  });

  const toast = useToast();

  const toggleCollapsed = useCallback(() => {
    setTextView({
      ...textView,
      viewMore: !textView.viewMore,
    });
  }, [textView]);

  const onTextLayout = useCallback(
    (e: any) => {
      const l = e.nativeEvent.lines.length;
      setTextView({
        ...textView,
        fullText: l,
      });
    },
    [textView],
  );

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    toast.show('Text copied to Clipboard!', {
      placement: 'center',
      duration: 500,
    });
  };

  const [translatedText, setTranslatedText] = useState({
    languageDetected: 'vi',
    seeTranslate: true,
    translated: '',
  });

  useEffect(() => {
    if (post.contentPost) {
      const detectLanguage = new LanguageDetect();
      const result = detectLanguage.detect(post.contentPost, 1);
      if (result?.length >= 1) {
        setTranslatedText({
          ...translatedText,
          languageDetected: result[0][0].slice(0, 2),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.contentPost]);

  const language = useTranslation();

  const translateHandle = useCallback(() => {
    translate(post.contentPost.split('\n'), {
      from: translatedText.languageDetected,
      to: currentLanguage,
    })
      .then((result: any) => {
        setTranslatedText({...translatedText, translated: result.join('\n')});
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [currentLanguage, post.contentPost, translatedText]);

  return (
    <View>
      {post?.contentPost ? (
        <>
          <Text
            numberOfLines={
              !textView.viewMore ? textView.numberOfLines : undefined
            }
            onPress={toggleCollapsed}
            onLongPress={() => copyToClipboard(post.contentPost)}
            style={[styles.textContent]}
            onTextLayout={onTextLayout}>
            {post.contentPost}
          </Text>

          <Text style={styles.textButton} onPress={toggleCollapsed}>
            {textView.fullText < 5
              ? ''
              : !textView.viewMore && textView.fullText >= 5
                ? language.t('viewMore')
                : 'Ẩn bớt'}
          </Text>
        </>
      ) : (
        <></>
      )}
      {!post.contentPost ? (
        <View style={{height: 0}} />
      ) : (
        currentLanguage !== translatedText.languageDetected && (
          <>
            {translatedText.translated !== '' &&
              translatedText.seeTranslate && (
                <Text
                  onLongPress={() =>
                    copyToClipboard(translatedText.translated)
                  }>
                  {translatedText.translated}
                </Text>
              )}
            <Text
              style={styles.textButton}
              onPress={() => {
                if (translatedText.translated === '') {
                  translateHandle();
                } else {
                  setTranslatedText({
                    ...translatedText,
                    seeTranslate: !translatedText.seeTranslate,
                  });
                }
              }}>
              {translatedText.translated === ''
                ? language.t('Xem bản dịch')
                : translatedText.seeTranslate
                  ? language.t('Ẩn bản dịch')
                  : language.t('Xem bản dịch')}
            </Text>
          </>
        )
      )}
    </View>
  );
};

export default ContentSocialPostItem;

const styles = StyleSheet.create({
  textContent: {
    ...globalStyles.text17Medium,
    fontWeight: '400',
    color: '#000',
  },
  textButton: {
    ...globalStyles.text15SemiBold,
    color: '#65676B',
    marginBottom: 5,
    fontWeight: '400',
  },
});
