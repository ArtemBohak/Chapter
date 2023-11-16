export interface IUserStore {
  id: number;
  email: string;
  nickName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  userStatus: string | null;
  country: number | null;
  region: number | null;
  city: number | null;
  provider: string;
  socialId: number | string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  photo?: string | null;
  role: IUserRole;
  status: IUserStatus;
  location: string | null;
}

export interface IUserRole {
  id: number;
  name: string;
}

export interface IUserStatus {
  id: number;
  name: string;
}
