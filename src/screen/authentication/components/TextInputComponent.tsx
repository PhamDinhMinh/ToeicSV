import {
  View,
  Text,
  TextInput,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';
import {color} from '@/global-style';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const TextInputComponent = ({
  containerStyle = {},
  inputStyle = {},
  placeholder = '',
  value = '',
  defaultValue = '',
  onChangeText = () => {},
  error = '',
  secureTextEntry = false,
  autoCapitalize = 'none',
  isTenancy = false,
}: {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  value: string;
  defaultValue?: string;
  onChangeText: (v: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  isTenancy?: boolean;
}) => {
  const [isSecurity, setIsSecurity] = useState(secureTextEntry);
  const opacityValue = useSharedValue(0.5);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: !isTenancy
        ? undefined
        : value.length === 0
          ? opacityValue.value
          : 1,
    };
  });
  return (
    <View>
      <Animated.View
        style={[
          {
            backgroundColor: color.grey_200,
            borderRadius: 15,
            flexDirection: 'row',
            borderColor: color.green_300,
            borderWidth: 1,
            paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          },
          containerStyle,
          animatedStyle,
        ]}>
        <TextInput
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          secureTextEntry={isSecurity}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          onFocus={() => {
            // setIsFocused(true);
            opacityValue.value = withTiming(1, {duration: 200});
          }}
          onBlur={() => {
            // setIsFocused(false);
            opacityValue.value = withTiming(0.5, {duration: 200});
          }}
          placeholderTextColor={color.green_700}
          placeholder={placeholder}
          style={[
            {
              color: color.green_500,
              paddingVertical: Platform.OS === 'android' ? 5 : 0,
              paddingLeft: '5%',
              paddingRight: secureTextEntry ? '15%' : '5%',
              width: '100%',
            },
            inputStyle,
          ]}
        />
        {secureTextEntry && (
          <Icon
            onPress={() => setIsSecurity(!isSecurity)}
            color={color.green_300}
            name={isSecurity ? 'eye-off' : 'eye'}
            type="ionicon"
            containerStyle={{
              position: 'absolute',
              right: '5%',
              height: Platform.OS === 'ios' ? 40 : '100%',
              justifyContent: 'center',
            }}
          />
        )}
      </Animated.View>
      <Text
        style={{
          color: '#FFB800',
          paddingHorizontal: '5%',
          fontWeight: '700',
          fontSize: 10,
        }}>
        {error}
      </Text>
    </View>
  );
};

export default TextInputComponent;
