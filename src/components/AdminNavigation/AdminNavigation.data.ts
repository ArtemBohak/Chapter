import { IconEnum } from "../Icon";
import { NavigationLinkProps } from "./AdminNavigation.type";

export const topNavigation: NavigationLinkProps[] = [
  {
    id: "1",
    path: "/admin",
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
    path: "/admin/settings",
    icon: IconEnum.Settings,
    name: "Settings",
  },
  {
    id: "6",
    path: "/",
    icon: IconEnum.SignOut,
    name: "Logout",
  },
];
