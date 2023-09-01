import { IUserStore } from "../types/user";

export const defaultUserState: IUserStore = {
  id: 0,
  firstName: "",
  lastname: "",
  nickname: "",
  avatarUrl: null,
  location: null,
  userStatus: null,
};
