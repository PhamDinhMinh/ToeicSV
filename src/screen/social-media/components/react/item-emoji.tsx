import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {View as MotiView, AnimatePresence, useAnimationState} from 'moti';
import {useTranslation} from 'react-i18next';

type TItemEmoji = {
  Data: any;
  index: number;
  scaled: boolean;
  des: string;
  onPress?: () => void;
};

export default function ItemEmoji(props: TItemEmoji) {
  const {Data, index, scaled, des, ...rest} = props;
  const language = useTranslation();

  const animatedState = useAnimationState({
    scaleIn: {
      scale: 1,
      // translateY: -10,
    },
    scaleOut: {
      scale: 1,
    },
  });

  useEffect(() => {
    animatedState.transitionTo(scaled ? 'scaleIn' : 'scaleOut');
  }, [animatedState, scaled]);
  return (
    <Pressable {...rest} style={[styles.root]}>
      <AnimatePresence exitBeforeEnter>
        {scaled && (
          <MotiView
            style={[
              styles.titleBox,
              {
                width: language.t(des) === language.t('dear') ? 120 : 90,
              },
            ]}
            from={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}>
            <Text
              style={[
                styles.title,
                {
                  width: language.t(des) === language.t('dear') ? 120 : 90,
                },
              ]}>
              {language.t(des)}
            </Text>
          </MotiView>
        )}
      </AnimatePresence>
      <MotiView
        from={{transform: [{translateY: 40}, {scale: 1}]}}
        animate={{transform: [{translateY: 0}, {scale: 1}]}}
        exit={{
          transform: [{translateY: 40}, {scale: ((1 / 6) * index) / 10}],
        }}
        transition={{delay: (index + 1) * 60}}>
        <MotiView state={animatedState}>
          <Data />
        </MotiView>
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.24)',
    top: -50,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
