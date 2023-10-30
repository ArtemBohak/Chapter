import { NavigationLinkProps } from "./ProfileNavigation.type";
import { IconEnum } from "../../../../components/Icon";

export const topNavigation: NavigationLinkProps[] = [
  {
    id: "1",
    path: "/feed",
    icon: IconEnum.Home,
    name: "Feed",
  },
  {
    id: "2",
    path: "/",
    icon: IconEnum.Search,
    name: "Search",
  },
  {
    id: "3",
    path: "/",
    icon: IconEnum.Notification,
    name: "Notification",
  },
  {
    id: "4",
    path: "/",
    icon: IconEnum.User,
    name: "Profile",
  },
];

export const bottomNavigation: NavigationLinkProps[] = [
  {
    id: "5",
    path: "/settings",
    icon: IconEnum.Settings,
    name: "Settings",
  },
];
