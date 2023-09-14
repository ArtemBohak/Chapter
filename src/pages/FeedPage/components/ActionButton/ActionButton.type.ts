import { IconEnum } from "@/src/components";

export type ActionButtonProps = {
  iconType: IconEnum;
  value: number;
  id: string;
  clickedList: string[];
  size?: number | undefined;
};
