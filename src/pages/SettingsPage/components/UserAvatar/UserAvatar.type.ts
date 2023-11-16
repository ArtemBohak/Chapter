import { IUserStore } from "@/src/redux";

export type AvatarProps = Pick<IUserStore, "avatarUrl" | "email">;
