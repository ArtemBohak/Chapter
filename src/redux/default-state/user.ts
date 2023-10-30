import { IUserStore } from "../types/user";

export const defaultUserState: IUserStore = {
  id: 0,
  firstName: "",
  lastName: "",
  nickName: "",
  avatarUrl: null,
  country: null,
  region: null,
  city: null,
  userStatus: null,
  userEmail: "",
  provider: "",
  socialId: null,
  createdAt: "",
  updatedAt: "",
  role: {
    id: 0,
    name: "",
  },
  status: {
    id: 0,
    name: "",
  },
};
