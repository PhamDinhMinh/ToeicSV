export interface IUser {
  id: number;
  userName: string;
  name: string;
  emailAddress: string;
  phoneNumber?: string;
  creationTime: string;
  role?: string;
  dateOfBirth?: any;
  gender?: string;
  imageUrl?: string;
  coverImageUrl?: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ILoginPayload {
  userNameOrEmail: string;
  password: string;
}
