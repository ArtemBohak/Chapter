import { IconEnum } from "@/src/components";

export type SocialButtonProps = {
  iconType: IconEnum;
  value: number;
  id: string;
  clickedList: string[];
  size?: number | undefined;
};
