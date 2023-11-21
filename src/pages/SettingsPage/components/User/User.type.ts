import { IUserStore } from "@/src/redux";

export type UserProps = Pick<IUserStore, "avatarUrl" | "email">;
