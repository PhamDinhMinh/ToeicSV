import {create} from 'zustand';

export interface IAvatarDefault {
  avatarDefault: string;
}

const useAvatarDefault = create<IAvatarDefault>(set => ({
  avatarDefault:
    'https://imaxtek.s3.ap-southeast-1.amazonaws.com/public/1691025785984-6663.jpg',
  setAvatarDefault: (avatarDefault: string) => set(() => ({avatarDefault})),
}));

export default useAvatarDefault;
