import { NavigationLinkProps } from "../Navigation/Navigation.type";

export type NavigationListProps = {
  className?: string;
  items: NavigationLinkProps[];
  isBottom?: boolean;
};
