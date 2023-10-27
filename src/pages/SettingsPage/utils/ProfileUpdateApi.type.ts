import { FileUploadArgs } from "@/src/types";
import { UserData } from "@/src/services/UserApiConstructor/UserApiConstructor.type";

export type ProfileUpdateApiArgs = UserData;

export type ImageSaveArgs = {
  file: File | string;
  id: number;
} & Partial<FileUploadArgs>;
