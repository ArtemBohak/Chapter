import { NavigationLinkProps } from "./Navigation.type";
import { links } from "@/src/types";

export const navigation: NavigationLinkProps[] = [
  {
    id: "1",
    path: links.TERMS + "/1",
    name: "title 1",
  },
  {
    id: "2",
    path: links.TERMS + "/2",
    name: "title 2",
  },
  {
    id: "3",
    path: links.TERMS + "/3",
    name: "title 3",
  },
  {
    id: "4",
    path: links.TERMS + "/4",
    name: "title 4",
  },
  {
    id: "5",
    path: links.TERMS + "/5",
    name: "title 5",
  },
];

export const bottomNavigation: NavigationLinkProps[] = [];
