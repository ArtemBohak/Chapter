import { IAuthor } from "@/src/types";

export type PostFullNameProps = Required<
  Pick<IAuthor, "firstName" | "lastName">
>;
