export type Data =
  | {
      id: string;
      name: string;
      followList: string[];
      avatar: string;
    }[]
  | [];
