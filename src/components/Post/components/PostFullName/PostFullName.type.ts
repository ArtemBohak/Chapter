import { Author } from "@/src/types";

export type PostFullNameProps = Required<
  Pick<Author, "firstName" | "lastName">
>;
