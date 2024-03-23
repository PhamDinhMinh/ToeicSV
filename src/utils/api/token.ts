import AsyncStorageLib from '@react-native-async-storage/async-storage';

export const getToken = async () =>
  await AsyncStorageLib.getItem('accessToken');

export const setToken = async (token: string) =>
  await AsyncStorageLib.setItem('accessToken', token);

export const removeToken = async () =>
  await AsyncStorageLib.removeItem('accessToken');
