import { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavigationTogglerProvider } from "@/src/context";
import styles from "./TermsPage.module.scss";
import { SidebarNavigation } from "./components";

const TermsPage: FC = () => {
  return (
    <>
      <NavigationTogglerProvider>
        <SidebarNavigation />
      </NavigationTogglerProvider>
      <main>
        <section className={styles["terms"]}>
          <h1 className={styles["title"]}>
            Terms & Conditions and Privacy Policy
          </h1>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default TermsPage;
