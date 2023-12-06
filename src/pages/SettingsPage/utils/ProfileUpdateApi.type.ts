import { FileArgs } from "@/src/types";
import { UserData } from "@/src/services/UserApiConstructor/UserApiConstructor.type";
import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

export type ProfileUpdateApiArgs = UserData;

export type ImageSaveArgs = FileArgs;

export type SetErrorType =
  | Dispatch<SetStateAction<string | null | AxiosError>>
  | Dispatch<SetStateAction<string | null>>;
