import {IUser} from '@/screen/authentication/login/services/login.modal';
import {create} from 'zustand';

export interface IAccountState {
  account: null | IUser;
  setAccount: (user: IUser) => void;
}

const useAccountStore = create<IAccountState>(set => ({
  account: null,
  setAccount: (account: IUser) => set(() => ({account})),
}));

export default useAccountStore;
