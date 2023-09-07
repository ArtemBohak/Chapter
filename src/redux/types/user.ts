export interface IUserStore {
  id: number;
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  userStatus?: string | null;
  location?: string | null;
  provider: string;
  socialId: number | string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  photo?: string | null;
  role: IUserRole;
  status: IUserStatus;
}

export interface IUserRole {
  id: number;
  name: string;
}

export interface IUserStatus {
  id: number;
  name: string;
}
