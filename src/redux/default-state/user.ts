import { IUserStore } from "../types/user";

export const defaultUserState: IUserStore = {
  id: 0,
  firstName: "",
  lastName: "",
  nickname: "",
  avatarUrl: null,
  location: null,
  userStatus: null,
  email: "",
  provider: "",
  socialId: null,
  createdAt: "",
  updatedAt: "",
  role: {
    id: 0,
    name: "",
    __entity: "",
  },
  status: {
    id: 0,
    name: "",
    __entity: "",
  },
  __entity: "",
};
