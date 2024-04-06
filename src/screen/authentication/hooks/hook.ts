import {useEffect, useState} from 'react';
import authService from '../login/services/login.services';
import useAccountStore, {IAccountState} from '@/stores/account.store';
import {useMutation} from '@tanstack/react-query';
import {setToken} from '@/utils/api/token';
import {ILoginResponse} from '../login/services/login.modal';
import Toast from 'react-native-toast-message';

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const useLoginRequest = () => {
  const setAccount = useAccountStore(
    (state: IAccountState) => state.setAccount,
  );

  const setTokenAuth = useAccountStore(
    (state: IAccountState) => state.setTokenAuth,
  );

  const query = useMutation({
    mutationFn: (loginParams: any) => authService.login(loginParams),
    onError: (err: any) => {
      return Toast.show({
        type: 'error',
        text1: err?.data,
        topOffset: 80,
      });
    },
    onSuccess: (data: ILoginResponse) => {
      setTokenAuth(data?.accessToken);
      setToken(data?.accessToken);
      setAccount(data?.user);
    },
  });

  return query;
};
