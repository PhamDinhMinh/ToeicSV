import {IUser} from '@/screen/authentication/login/services/login.modal';
import {create} from 'zustand';

export interface IAccountState {
  token: string | null;
  account: null | IUser;
  setAccount: (user: null | IUser) => void;
  setTokenAuth: (token: string | null) => void;
}

const useAccountStore = create<IAccountState>(set => ({
  token: null,
  account: null,
  setAccount: (account: null | IUser) => set({account}),
  setTokenAuth: (token: null | string) => set({token}),
}));

export default useAccountStore;
