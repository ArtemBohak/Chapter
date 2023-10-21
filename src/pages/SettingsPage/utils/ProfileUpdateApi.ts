import { EndpointsEnum, api } from "@/src/axios";
import { ImageSaveArgs, ProfileUpdateApiArgs } from "./ProfileUpdateApi.type";
import { FilesService, UserApiConstructor } from "@/src/services";
import { AppDispatch } from "@/src/redux/store";
import { SetIsLoadingType } from "@/src/services/UserApiConstructor/UserApiConstructor.type";
import { logout } from "@/src/redux/slices";

export class ProfileUpdateApi extends UserApiConstructor {
  constructor(dispatch: AppDispatch, setIsLoading?: SetIsLoadingType) {
    super(dispatch, setIsLoading);
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

  deleteAccount = this.tryCatchWrapper(async () => {
    const res = await api.delete(EndpointsEnum.PROFILE);
    this.dispatch(logout());
    localStorage.clear();
    return res;
  });
}
