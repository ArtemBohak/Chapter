export interface IUser {
  avatarUrl: string | null;
  userId: number;
  id: number;
  firstName: string;
  lastName: string;
  nickName: string;
  isSubscribed: boolean;
  userStatus: string;
  location: string;
}
