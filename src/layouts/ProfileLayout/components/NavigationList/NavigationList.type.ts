import {
  NavigationLinkProps,
  ProfileNavigationProps,
} from "../ProfileNavigation/ProfileNavigation.type";

export type NavigationListProps = {
  className?: string;
  items: NavigationLinkProps[];
  isBottom?: boolean;
} & Pick<ProfileNavigationProps, "setModalIsOpen">;
