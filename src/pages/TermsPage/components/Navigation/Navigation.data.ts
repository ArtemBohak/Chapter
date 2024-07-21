import { NavigationLinkProps } from "./Navigation.type";
import { links } from "@/src/types";

export const navigation: NavigationLinkProps[] = [
  {
    id: "1",
    path: links.TERMS + "/1",
    name: "1. Introduction",
  },
  {
    id: "2",
    path: links.TERMS + "/2",
    name: "2. Acceptance of Terms",
  },
  {
    id: "3",
    path: links.TERMS + "/3",
    name: "3. User Accounts",
  },
  {
    id: "4",
    path: links.TERMS + "/4",
    name: "4. User Conduct",
  },
  {
    id: "5",
    path: links.TERMS + "/5",
    name: "5. Content Ownership and Use",
  },
  {
    id: "6",
    path: links.TERMS + "/6",
    name: "6. Privacy",
  },
  {
    id: "7",
    path: links.TERMS + "/7",
    name: "7. Termination",
  },
  {
    id: "8",
    path: links.TERMS + "/8",
    name: "8. Disclaimer of Warranties",
  },
  {
    id: "9",
    path: links.TERMS + "/9",
    name: "9. Limitation of Liability",
  },
  {
    id: "10",
    path: links.TERMS + "/10",
    name: "10. Changes to Terms",
  },
  {
    id: "11",
    path: links.TERMS + "/11",
    name: "11. Contact Information",
  },
];

export const bottomNavigation: NavigationLinkProps[] = [];
