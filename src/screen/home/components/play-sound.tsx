import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TrackPlayer, {Capability, useProgress} from 'react-native-track-player';
import globalStyles from '@/global-style';
import {Icon} from '@rneui/themed';
import Slider from '@react-native-community/slider';
import {IResponseQuestion} from '../services/home.model';

type TPlaySound = {
  indexView?: number;
  question: IResponseQuestion;
  paused?: boolean;
};

const PlaySound = ({indexView, question, paused}: TPlaySound) => {
  const {position, duration} = useProgress();
  const [play, setPlay] = useState(false);

  const setUpPlayer = useCallback(async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.setVolume(1);
    } catch (error) {}
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      secs < 10 ? '0' : ''
    }${secs}`;
  }, []);

  const seekBySeconds = async (seconds: number) => {
    const newPosition = Math.max(0, Math.min(position + seconds, duration));
    await TrackPlayer.seekTo(newPosition);
  };

  const handleSliderValueChange = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  useEffect(() => {
    setUpPlayer();
  }, [setUpPlayer]);

  useEffect(() => {
    const resetTrackPlayer = async () => {
      setPlay(false);
      await TrackPlayer.reset();
    };
    resetTrackPlayer();
  }, [indexView]);

  return (
    <View style={styles.sliderView}>
      <Pressable style={styles.viewIcon} onPress={() => seekBySeconds(-5)}>
        <Icon type="material" name="replay-5" color={'white'} size={24} />
      </Pressable>
      {!play || paused ? (
        <Pressable
          onPress={async () => {
            await TrackPlayer.add({
              id: question?.id,
              url:
                question?.audioUrl ??
                'https://res.cloudinary.com/dq8tazie4/raw/upload/v1716041942/files/fyqbjnatukzdbwigmqky.mp3',
            });
            TrackPlayer.play();
            setPlay(true);
          }}>
          <Icon type="ionicon" name="play" color={'white'} size={24} />
        </Pressable>
      ) : (
        <Icon
          type="ionicon"
          name="pause"
          color={'white'}
          size={24}
          onPress={async () => {
            await TrackPlayer.pause();
            setPlay(false);
          }}
        />
      )}
      <Icon
        type="material"
        name="forward-5"
        color={'white'}
        size={22}
        onPress={() => seekBySeconds(+5)}
      />
      <Text style={styles.textTime}>{formatTime(position)}</Text>
      <Slider
        style={{flex: 1, height: 40}}
        minimumValue={0}
        maximumValue={duration || 1}
        value={position}
        onValueChange={handleSliderValueChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text style={styles.textTime}>{formatTime(duration)}</Text>
    </View>
  );
};

export default PlaySound;

const styles = StyleSheet.create({
  sliderView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.26)',
  },
  viewIcon: {
    marginLeft: 10,
  },
  textTime: {
    ...globalStyles.text16Regular,
    paddingHorizontal: 10,
    color: 'white',
  },
});
