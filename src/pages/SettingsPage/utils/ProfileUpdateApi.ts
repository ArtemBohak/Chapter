import { EndpointsEnum, api } from "@/src/axios";
import {
  FilesService,
  UserApiConstructor,
  SetIsLoadingType,
} from "@/src/services";

import { SetErrorType } from "@/src/types";
import { ProfileUpdateApiArgs } from "./ProfileUpdateApi.type";

export class ProfileUpdateApi extends UserApiConstructor {
  private userAvatarParams = {
    alt: "user avatar",
    transform:
      "c_thumb,h_216,w_216/r_30/f_auto,q_auto:eco/d_chapter:placeholders:post.webp",
  };

  constructor(setIsLoading?: SetIsLoadingType, setError?: SetErrorType) {
    super(undefined, setIsLoading, undefined, setError);
  }

  async imageSave(id: string | number, file: File) {
    try {
      this.setIsLoading && this.setIsLoading(true);

      const res = await new FilesService(id, file, true, this.setError).upload(
        this.userAvatarParams
      );

      if (res.code) {
        return res;
      }

      await this.userSave({
        avatarUrl: res?.eager[0].secure_url,
      });
    } finally {
      this.setIsLoading && this.setIsLoading(false);
    }
  }

  updatePassword = this.tryCatchWrapper(
    async (payload: ProfileUpdateApiArgs) => {
      const res = await api.post(EndpointsEnum.UPDATE_PASSWORD, payload);

      return res;
    }
  );

  userSave = this.tryCatchWrapper(async (payload: ProfileUpdateApiArgs) => {
    const res = await api.patch(EndpointsEnum.PROFILE, payload);

    this.handleUserData(res.data);
    return res;
  });

  deleteAccount = this.tryCatchWrapper(async () => {
    const res = await api.delete(EndpointsEnum.PROFILE);
    this.resetUserData();
    return res;
  });
}
