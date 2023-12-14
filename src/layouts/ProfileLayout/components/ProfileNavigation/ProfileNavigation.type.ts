import { IconEnum } from "../../../../components/Icon";
import { SidebarNavigationProps } from "../SidebarNavigation/SidebarNavigation.type";

export type ProfileNavigationProps = Pick<
  SidebarNavigationProps,
  "setModalIsOpen"
>;

export type NavigationList = {
  items: NavigationLinkProps[];
};

export type NavigationLinkProps = {
  id: string;
  path: string;
  icon: IconEnum;
  name: string;
};
