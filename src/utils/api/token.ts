import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => await AsyncStorage.getItem('accessToken');

export const setToken = async (token: string) =>
  await AsyncStorage.setItem('accessToken', token);

export const removeToken = async () =>
  await AsyncStorage.removeItem('accessToken');
