import { IUserStore } from "../types/user";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

export const defaultUserState: IUserStore = {
  id: 0,
  firstName: "",
  lastName: "",
  nickName: "",
  avatarUrl: defaultAvatar,
  country: null,
  region: null,
  city: null,
  userStatus: null,
  email: "",
  provider: "",
  socialId: null,
  createdAt: "",
  updatedAt: "",
  location: null,
  role: {
    id: 0,
    name: "",
  },
  status: {
    id: 0,
    name: "",
  },
};
