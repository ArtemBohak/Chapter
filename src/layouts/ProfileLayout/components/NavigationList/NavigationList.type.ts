import {
  NavigationLinkProps,
  ProfileNavigationProps,
} from "../ProfileNavigation/ProfileNavigation.type";

export type NavigationListProps = {
  className?: string;
  items: NavigationLinkProps[];
} & Pick<ProfileNavigationProps, "setModalIsOpen">;
