import { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavigationTogglerProvider } from "@/src/context";
import { SidebarNavigation } from "./components";

const TermsPage: FC = () => {
  return (
    <>
      <NavigationTogglerProvider>
        <SidebarNavigation />
      </NavigationTogglerProvider>
      <Outlet />
    </>
  );
};

export default TermsPage;
