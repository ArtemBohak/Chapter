import { IPostProps } from "../../Post.type";

export type PostDateProps = Required<Pick<IPostProps, "createAt">>;
