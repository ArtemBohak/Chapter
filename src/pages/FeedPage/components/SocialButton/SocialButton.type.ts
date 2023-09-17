import { IconEnum } from "@/src/components";
import { type Data } from "../../FeedPage.type";

export type SocialButtonProps = {
  iconType: IconEnum;
  userId: string;
  dataList: Data;
  modalTitle: string;
  size?: number | undefined;
};
