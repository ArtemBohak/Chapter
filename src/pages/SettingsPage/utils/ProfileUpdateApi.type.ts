import { FileArgs } from "@/src/types";
import { UserData } from "@/src/services/UserApiConstructor/UserApiConstructor.type";
import { Dispatch, SetStateAction } from "react";

export type ProfileUpdateApiArgs = UserData;

export type ImageSaveArgs = FileArgs;

export type SetErrorType = Dispatch<SetStateAction<string | null>>;
