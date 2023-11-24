import { ProfileUpdateApi } from "@/src/pages/SettingsPage/utils/ProfileUpdateApi";

export type ImageInputProps = {
  profileUpdateApi?: typeof ProfileUpdateApi;
  id: number | string;
  btnVariant: "button" | "icon";
  imageType: "avatar" | "post";
  iconSize?: number;
};
