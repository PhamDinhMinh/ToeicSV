import {create} from 'zustand';

const useAccountStore = create(set => ({
  user: null,
  setAccount: (user: any) => set(() => ({user})),
}));

export default useAccountStore;
