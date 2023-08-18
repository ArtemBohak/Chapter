import { IconEnum } from "../Icon";

export type NavigationList = {
  items: NavigationLinkProps[];
};

export type NavigationLinkProps = {
  id: string;
  path: string;
  icon: IconEnum;
  name: string;
};
