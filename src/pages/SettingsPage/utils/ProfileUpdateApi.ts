import { EndpointsEnum, api } from "@/src/axios";
import {
  FilesService,
  UserApiConstructor,
  SetIsLoadingType,
} from "@/src/services";

import { ProfileUpdateApiArgs } from "./ProfileUpdateApi.type";

export class ProfileUpdateApi extends UserApiConstructor {
  private userAvatarParams = {
    alt: "user avatar",
    height: 640,
    width: 640,
    radius: 50,
  };

  constructor(setIsLoading?: SetIsLoadingType) {
    super(undefined, setIsLoading);
  }

  async imageSave(id: string | number, file: File) {
    try {
      this.setIsLoading && this.setIsLoading(true);

      const res = await new FilesService(id, file, true).upload(
        this.userAvatarParams
      );
      await this.userSave({
        avatarUrl: res?.eager[0].secure_url,
      });

      return res;
    } finally {
      this.setIsLoading && this.setIsLoading(false);
    }
  }

  updatePassword = this.tryCatchWrapper(
    async (payload: ProfileUpdateApiArgs) =>
      await api.post(EndpointsEnum.UPDATE_PASSWORD, payload)
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
