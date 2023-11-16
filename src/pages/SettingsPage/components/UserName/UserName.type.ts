import { IUserStore } from "@/src/redux";

export type UserNameProps = Pick<IUserStore, "firstName" | "lastName">;
