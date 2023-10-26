import { EndpointsEnum, api } from "@/src/axios";
import {
  FilesService,
  AuthApiConstructor,
  SetIsLoadingType,
} from "@/src/services";
import { logoutUser, updateUserLocation } from "@/src/redux";

import { ImageSaveArgs, ProfileUpdateApiArgs } from "./ProfileUpdateApi.type";

export class ProfileUpdateApi extends AuthApiConstructor {
  constructor(setIsLoading?: SetIsLoadingType) {
    super(undefined, setIsLoading);
  }

  async imageSave(payload: ImageSaveArgs) {
    try {
      this.setIsLoading && this.setIsLoading(true);
      return await FilesService.upload({
        avatar: true,
        alt: "user avatar",
        height: 640,
        width: 640,
        radius: 50,
        ...payload,
      });
    } finally {
      this.setIsLoading && this.setIsLoading(false);
    }
  }

  updatePassword = this.tryCatchWrapper(
    async (payload: ProfileUpdateApiArgs) =>
      await api.post(EndpointsEnum.UPDATE_PASSWORD, payload)
  );

  userSave = this.tryCatchWrapper(
    async (payload: ProfileUpdateApiArgs) =>
      await api.patch(EndpointsEnum.PROFILE, payload)
  );

  userLocationSave = this.tryCatchWrapper(
    async (payload: ProfileUpdateApiArgs) => {
      const res = await api.patch(EndpointsEnum.PROFILE, payload);

      this.dispatch(updateUserLocation(res.data));
      return res;
    }
  );

  deleteAccount = this.tryCatchWrapper(async () => {
    const res = await api.delete(EndpointsEnum.PROFILE);
    this.dispatch(logoutUser());
    localStorage.clear();
    return res;
  });
}
