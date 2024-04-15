import {ImageBackground, StyleSheet, Text} from 'react-native';
import React from 'react';
import listBackground from './background/background-post';
import globalStyles from '@/global-style';
import {IPostResponse} from '../services/social-media.model';

type TBackGroundPost = {
  post: IPostResponse;
};
const BackGroundPost = (props: TBackGroundPost) => {
  const {post} = props;
  return (
    <ImageBackground
      source={{
        uri: listBackground[post.backGroundId].linkBackGround,
      }}
      resizeMode="cover"
      imageStyle={{borderRadius: 12}}
      style={{
        height: 270,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Text
        style={[
          styles.textContent,
          {
            color: listBackground[post.backGroundId].colorText,
          },
        ]}>
        {post.contentPost}
      </Text>
    </ImageBackground>
  );
};

export default BackGroundPost;

const styles = StyleSheet.create({
  inputBackgroundContainer: {
    height: 280,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'blue',
  },

  textContent: {
    paddingHorizontal: 25,
    ...globalStyles.text17Bold,
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
