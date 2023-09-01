export interface IUserStore {
  id: number;
  nickname: string;
  firstName: string;
  lastname: string;
  avatarUrl?: string | null;
  userStatus?: string | null;
  location?: string | null;
}
