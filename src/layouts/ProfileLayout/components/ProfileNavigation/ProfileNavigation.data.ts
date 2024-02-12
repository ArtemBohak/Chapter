import { NavigationLinkProps } from "./ProfileNavigation.type";
import { IconEnum } from "../../../../components/Icon";
import { links } from "@/src/types";

export const navigation: NavigationLinkProps[] = [
  {
    id: "1",
    path: links.FEED,
    icon: IconEnum.Home,
    name: "Feed",
  },
  {
    id: "2",
    path: "/",
    icon: IconEnum.Notification,
    name: "Notification",
  },
  {
    id: "3",

    path: links.SEARCH,
    icon: IconEnum.Search,
    name: "Search",
  },
  {
    id: "4",
    path: links.PROFILE,
    icon: IconEnum.User,
    name: "Profile",
  },
];

export const bottomNavigation: NavigationLinkProps[] = [
  {
    id: "5",
    path: links.SETTINGS,
    icon: IconEnum.Settings,
    name: "Settings",
  },
];
